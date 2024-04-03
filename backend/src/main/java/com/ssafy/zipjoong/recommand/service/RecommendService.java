package com.ssafy.zipjoong.recommand.service;

import com.ssafy.zipjoong.product.domain.Keyboard;
import com.ssafy.zipjoong.product.domain.Monitor;
import com.ssafy.zipjoong.product.domain.Mouse;
import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.product.dto.KeyboardResponse;
import com.ssafy.zipjoong.product.dto.MonitorResponse;
import com.ssafy.zipjoong.product.dto.MouseResponse;
import com.ssafy.zipjoong.product.dto.ProductResponse;
import com.ssafy.zipjoong.product.exception.ProductErrorCode;
import com.ssafy.zipjoong.product.exception.ProductException;
import com.ssafy.zipjoong.product.repository.ProductRepository;
import com.ssafy.zipjoong.recommand.dto.CombinationResponse;
import com.ssafy.zipjoong.recommand.dto.ProductRequest;
import com.ssafy.zipjoong.recommand.dto.RecommendRespone;
import com.ssafy.zipjoong.recommand.exception.CombinationErrorCode;
import com.ssafy.zipjoong.recommand.exception.CombinationException;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final ProductRepository productRepository;
    private final String BASE_PATH = System.getenv("RECOM_PATH");

    /* 설문 기반 추천 */
    public List<CombinationResponse> getRecommendCombinations(String userId){
        if(userId.equals("anonymousUser"))throw new UserException(UserErrorCode.USER_NOT_FOUND);
        List<Product> keyboards = getRecommendProduct(BASE_PATH + "/recom_keyboard_final.py", userId, false);
        List<Product> monitors = getRecommendProduct(BASE_PATH + "/recom_monitor_final.py", userId, false);
        List<Product> mouses = getRecommendProduct(BASE_PATH + "/recom_mouse_final.py", userId, false);

        List<CombinationResponse> combinationResponses = new ArrayList<>();
        for(int i = 0; i < 4; i++){
            List<ProductResponse> monitorResponse = new ArrayList<>();
            monitorResponse.add(MonitorResponse.toDto(monitors.get(i)));
            int totalPrice = monitors.get(i).getProductPrice() + keyboards.get(i).getProductPrice() + mouses.get(i).getProductPrice();

            CombinationResponse combinationResponse = CombinationResponse.builder()
                    .mouse(MouseResponse.toDto(mouses.get(i)))
                    .keyboard(KeyboardResponse.toDto(keyboards.get(i)))
                    .monitors(monitorResponse)
                    .build();

            combinationResponse.setPrice(totalPrice);
            combinationResponses.add(combinationResponse);
        }

        return combinationResponses;
    }

    /* 제품 기반 유사 제품 추천 */
    public RecommendRespone getRecommendCombinationInfo(List<ProductRequest> productRequests){
        List<ProductResponse> monitorResponses = new ArrayList<>();
        KeyboardResponse keyboardResponse = null;
        MouseResponse mouseResponse = null;
        int totalPrice = 0;
        for(ProductRequest request : productRequests){
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new ProductException(ProductErrorCode.PRODUCT_NOT_FOUND));
            if (product instanceof Keyboard) {
                keyboardResponse = KeyboardResponse.toDto((Keyboard) product);
                totalPrice += product.getProductPrice();
            }
            else if (product instanceof Monitor){
                monitorResponses.add(MonitorResponse.toDto((Monitor) product));
                totalPrice += product.getProductPrice();
            }
            else if (product instanceof Mouse){
                mouseResponse = MouseResponse.toDto((Mouse) product);
                totalPrice += product.getProductPrice();
            }
        }
        // 상품별 유사 상품
        Map<String, List<ProductResponse>> similarProduct = new HashMap<>();
        similarProduct.put(keyboardResponse.getName(), new ArrayList<>());
        similarProduct.put(monitorResponses.get(0).getName(), new ArrayList<>());
        similarProduct.put(mouseResponse.getName(), new ArrayList<>());

        List<Product> similarKeyboards = getRecommendProduct(BASE_PATH + "/similar_to_similar_keyboard.py", String.valueOf(keyboardResponse.getId()), true);
        List<Product> similarMonitors = getRecommendProduct(BASE_PATH + "/similar_to_similar_monitor.py", String.valueOf(monitorResponses.get(0).getId()), true);
        List<Product> similarMouse = getRecommendProduct(BASE_PATH + "/similar_to_similar_mouse.py", String.valueOf(mouseResponse.getId()), true);
        for(int i = 0; i < 4; i++){
            similarProduct.get(keyboardResponse.getName()).add(KeyboardResponse.toDto((Keyboard) similarKeyboards.get(i)));
            similarProduct.get(monitorResponses.get(0).getName()).add(MonitorResponse.toDto((Monitor) similarMonitors.get(i)));
            similarProduct.get(mouseResponse.getName()).add(MouseResponse.toDto((Mouse) similarMouse.get(i)));
        }

        RecommendRespone recommendRespone = RecommendRespone.builder()
                .combinationId(0)
                .monitors(monitorResponses)
                .keyboard(keyboardResponse)
                .mouse(mouseResponse)
                .similarProduct(similarProduct)
                .build();

        recommendRespone.setPrice(totalPrice);

        return recommendRespone;
    }

    public List<Product> getRecommendProduct(String pythonPath, String arg, boolean isSimilar){
        List<Product> response = new ArrayList<>();
        try {
            ProcessBuilder processBuilder = isSimilar ? getSimilarProcess(pythonPath, arg) : getRecommendProcess(pythonPath, arg);
            processBuilder.redirectErrorStream(true); // 표준 오류를 표준 출력에 리다이렉트
            Process process = processBuilder.start();

            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            Pattern pattern = Pattern.compile("\\d+"); // 숫자를 찾는 정규 표현식 패턴
            while ((line = br.readLine()) != null) {
                Matcher matcher = pattern.matcher(line);
                if (matcher.find() && matcher.find()) {
                    Product product = productRepository.findById(Integer.parseInt(matcher.group()))
                            .orElseThrow(() -> new ProductException(ProductErrorCode.PRODUCT_NOT_FOUND));
                    response.add(product);
                }
            }
            br.close();

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new CombinationException(CombinationErrorCode.RECOMMEND_FAIL);
            }
        } catch (IOException | InterruptedException e) {
            throw new CombinationException(CombinationErrorCode.RECOMMEND_FAIL);
        }

        return response;
    }

    /* ProcessBuilder 설문 기반 추천 */
    private ProcessBuilder getRecommendProcess(String pythonPath, String userId) {
        return new ProcessBuilder(
                "python3",
                pythonPath,
                "--host", System.getenv("MYSQL_HOST"),
                "--user", System.getenv("MYSQL_USER"),
                "--password", System.getenv("MYSQL_PASSWORD"),
                "--database", System.getenv("MYSQL_DATABASE"),
                "--port", System.getenv("MYSQL_PORT"),
                "--user_id", userId);
    }

    /* ProcessBuilder 유사 제품 추천 */
    private ProcessBuilder getSimilarProcess(String pythonPath, String productId) {
        return new ProcessBuilder(
                "python3",
                pythonPath,
                "--host", System.getenv("MYSQL_HOST"),
                "--user", System.getenv("MYSQL_USER"),
                "--password", System.getenv("MYSQL_PASSWORD"),
                "--database", System.getenv("MYSQL_DATABASE"),
                "--port", System.getenv("MYSQL_PORT"),
                "--product_id", productId);
    }
}
