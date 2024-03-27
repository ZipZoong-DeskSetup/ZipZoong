package com.ssafy.zipjoong.like.dto;

import com.ssafy.zipjoong.product.dto.KeyboardResponse;
import com.ssafy.zipjoong.product.dto.MonitorResponse;
import com.ssafy.zipjoong.product.dto.MouseResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LikeProductsResponse {
    private List<MonitorResponse> monitors;
    private List<KeyboardResponse> keyboards;
    private List<MouseResponse> mouse;
}