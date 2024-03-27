package com.ssafy.zipjoong.user.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.like.domain.CombinationLike;
import com.ssafy.zipjoong.like.domain.ProductLike;
import com.ssafy.zipjoong.recommand.domain.Combination;
import com.ssafy.zipjoong.util.domain.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User extends EntityDate {
    @Id
    @Column(name = "user_id")
    private String userId;

    // 닉네임
    @Column(name = "user_nickname")
    private String userNickname;

    // 프로필 이미지
    @Column(name = "user_img")
    private String userImg;

    // 권한
    @Column(name = "user_role")
    @Enumerated(EnumType.STRING)
    private UserRoleType userRole;

    // 삭제 여부
    @Column(name = "user_is_deleted")
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

    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    private List<CombinationLike> combinationLikes;

    public void updateUserNickname(String userNickname) {
        if (userNickname != null && !userNickname.isEmpty()) {
            this.userNickname = userNickname;
        }
    }

    public void updateUserImg(String userImg) {
        if (userImg != null && !userImg.isEmpty()) {
            this.userImg = userImg;
        }
    }

}
