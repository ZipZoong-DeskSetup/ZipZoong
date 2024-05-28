package com.ssafy.zipjoong.recommand.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SaveCombinationRequest {
    private long combinationId;
    private List<ProductRequest> products;
}
