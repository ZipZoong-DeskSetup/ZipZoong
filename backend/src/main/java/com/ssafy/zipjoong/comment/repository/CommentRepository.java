package com.ssafy.zipjoong.comment.repository;

import com.ssafy.zipjoong.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardBoardId(Integer boardId);
}
