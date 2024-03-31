package com.ssafy.zipjoong.board.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class BoardUpdateRequest {
    private String boardTitle;
    private String boardContent;
    private String boardThumbnail;
    private List<Long> combinationIdList = new ArrayList<>();
}
