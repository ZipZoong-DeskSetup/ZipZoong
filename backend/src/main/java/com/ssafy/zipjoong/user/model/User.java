package com.ssafy.zipjoong.user.model;

import com.ssafy.zipjoong.board.model.Board;
import com.ssafy.zipjoong.like.model.CombinationLike;
import com.ssafy.zipjoong.like.model.ProductLike;
import com.ssafy.zipjoong.recommand.model.Combination;
import com.ssafy.zipjoong.util.model.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends EntityDate {
    @Id
    private String userId;

    // 닉네임
    private String userNickname;

    // 프로필 이미지
    private String userImg;

    // 삭제 여부
    private Boolean userIsDeleted;

    // 게시글 목록
    @OneToMany(mappedBy = "user")
    private List<Board> boards;

    // 조합 목록
    @OneToMany(mappedBy = "user")
    private List<Combination> combinations;

    // 좋아요한 제품 목록
    @OneToMany(mappedBy = "user")
    private List<ProductLike> productLikes;

    @OneToMany(mappedBy = "user")
    private List<CombinationLike> combinationLikes;

}
