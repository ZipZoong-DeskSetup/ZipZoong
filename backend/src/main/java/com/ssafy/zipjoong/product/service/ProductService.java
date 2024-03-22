package com.ssafy.zipjoong.product.service;

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
import com.ssafy.zipjoong.product.repository.KeyboardRepository;
import com.ssafy.zipjoong.product.repository.MonitorRepository;
import com.ssafy.zipjoong.product.repository.MouseRepository;
import com.ssafy.zipjoong.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final KeyboardRepository keyboardRepository;
    private final MouseRepository mouseRepository;
    private final MonitorRepository monitorRepository;

    /* 제품 조회 */
    public ProductResponse getProduct(int productId){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException(ProductErrorCode.PRODUCT_NOT_FOUND));

        // 제품 종류 체크 후 반환
        if(product instanceof Keyboard)
            return KeyboardResponse.toDto((Keyboard) product);
        else if(product instanceof Monitor)
            return MonitorResponse.toDto((Monitor) product);
        else if(product instanceof Mouse)
            return MouseResponse.toDto((Mouse) product);

        return ProductResponse.toDto(product);
    }

    /* 키보드 페이징 조회 */
    public Page<KeyboardResponse> getKeyboardWithPage(Pageable pageable){
        return Optional.of(keyboardRepository.findAll(pageable).map(KeyboardResponse::toDto))
                .orElseThrow(() -> new ProductException(ProductErrorCode.KEYBOARD_NOT_FOUND));
    }

    /* 모니터 페이징 조회 */
    public Page<MonitorResponse> getMonitorWithPage(Pageable pageable){
        return Optional.of(monitorRepository.findAll(pageable).map(MonitorResponse::toDto))
                .orElseThrow(() -> new ProductException(ProductErrorCode.MONITOR_NOT_FOUND));
    }

    /* 마우스 페이징 조회 */
    public Page<MouseResponse> getMouseWithPage(Pageable pageable){
        return Optional.of(mouseRepository.findAll(pageable).map(MouseResponse::toDto))
                .orElseThrow(() -> new ProductException(ProductErrorCode.MOUSE_NOT_FOUND));
    }
}
