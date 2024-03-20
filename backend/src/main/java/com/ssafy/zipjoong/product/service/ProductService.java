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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
//        if(product instanceof Keyboard)
//            return keyboardEntityToResponse((Keyboard) product);
//        else if(product instanceof Monitor)
//            return monitorEntityToResponse((Monitor) product);
//        else if(product instanceof Mouse)
//            return mouseEntityToResponse((Mouse) product);

        return productEntityToResponse(product);
    }

    public KeyboardResponse getKeyboard(int keyboardId){
        Keyboard keyboard = keyboardRepository.findById(keyboardId)
                .orElseThrow(() -> new ProductException(ProductErrorCode.KEYBOARD_NOT_FOUND));
        return keyboardEntityToResponse(keyboard);
    }

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public List<Keyboard> getAllKeyboard(){
        return keyboardRepository.findAll();
    }

    /* 키보드 페이징 조회 */
    public Page<KeyboardResponse> getKeyboardWithPage(Pageable pageable){
        return Optional.of(keyboardRepository.findAll(pageable).map(this::keyboardEntityToResponse))
                .orElseThrow(() -> new ProductException(ProductErrorCode.KEYBOARD_NOT_FOUND));
    }

    /* 모니터 페이징 조회 */
    public Page<MonitorResponse> getMonitorWithPage(Pageable pageable){
        return Optional.of(monitorRepository.findAll(pageable).map(this::monitorEntityToResponse))
                .orElseThrow(() -> new ProductException(ProductErrorCode.MONITOR_NOT_FOUND));
    }

    /* 마우스 페이징 조회 */
    public Page<MouseResponse> getMouseWithPage(Pageable pageable){
        return Optional.of(mouseRepository.findAll(pageable).map(this::mouseEntityToResponse))
                .orElseThrow(() -> new ProductException(ProductErrorCode.MOUSE_NOT_FOUND));
    }

    public Keyboard registKeyboard(Keyboard keyboard){
        System.out.println("keyboard : " + keyboard.toString());
        keyboard = keyboardRepository.save(keyboard);
//        System.out.println("keyboard : " + keyboard.toString());
        return keyboard;
    }
    @Transactional
    public void saveMonitor(Monitor monitor){
        monitorRepository.save(monitor);
    }
    @Transactional
    public void saveMouse(Mouse mouse){
        mouseRepository.save(mouse);
    }

    /* 제품 entity -> 제품 response(dto) */
    public ProductResponse productEntityToResponse(Product product){
        return ProductResponse.builder()
                .id(product.getProductId())
                .name(product.getProductName())
                .price(product.getProductPrice())
                .brand(product.getProductBrand())
                .img(product.getProductImg())
                .url(product.getProductUrl())
                .build();
    }

    /* 키보드 entity -> 키보드 response(dto) */
    public KeyboardResponse keyboardEntityToResponse(Keyboard keyboard){
        return KeyboardResponse.builder()
                .id(keyboard.getProductId())
                .name(keyboard.getProductName())
                .price(keyboard.getProductPrice())
                .brand(keyboard.getProductBrand())
                .img(keyboard.getProductImg())
                .url(keyboard.getProductUrl())
                .connect(keyboard.getKeyboardConnect())
                .connectInterface(keyboard.getKeyboardInterface())
                .keySwitch(keyboard.getKeyboardSwitch())
                .led(keyboard.getKeyboardLed())
                .num(keyboard.getKeyboardNum())
                .force(keyboard.getKeyboardForce())
                .color(keyboard.getKeyboardColor())
                .form(keyboard.getKeyboardForm())
                .contact(keyboard.getKeyboardContact())
                .build();
    }

    /* 모니터 entity -> 모니터 response(dto) */
    public MonitorResponse monitorEntityToResponse(Monitor monitor){
        return MonitorResponse.builder()
                .id(monitor.getProductId())
                .name(monitor.getProductName())
                .price(monitor.getProductPrice())
                .brand(monitor.getProductBrand())
                .img(monitor.getProductImg())
                .url(monitor.getProductUrl())
                .size(monitor.getMonitorSize())
                .resolution(monitor.getMonitorResolution())
                .aspectRatio(monitor.getMonitorAspectRatio())
                .refreshRate(monitor.getMonitorRefreshRate())
                .panelType(monitor.getMonitorPanelType())
                .panelFormType(monitor.getMonitorPanelForm())
                .build();
    }

    /* 마우스 entity -> 마우스 response(dto) */
    public MouseResponse mouseEntityToResponse(Mouse mouse){
        return MouseResponse.builder()
                .id(mouse.getProductId())
                .name(mouse.getProductName())
                .price(mouse.getProductPrice())
                .brand(mouse.getProductBrand())
                .img(mouse.getProductImg())
                .url(mouse.getProductUrl())
                .connect(mouse.getMouseConnect())
                .connectInterface(mouse.getMouseInterface())
                .type(mouse.getMouseType())
                .dpi(mouse.getMouseDpi())
                .color(mouse.getMouseColor())
                .weight(mouse.getMouseWeight())
                .width(mouse.getMouseWidth())
                .length(mouse.getMouseLength())
                .height(mouse.getMouseHeight())
                .isSound(mouse.getMouseIsSound())
                .build();
    }
}
