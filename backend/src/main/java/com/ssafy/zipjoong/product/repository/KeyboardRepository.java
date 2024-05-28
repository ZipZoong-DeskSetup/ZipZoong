package com.ssafy.zipjoong.product.repository;

import com.ssafy.zipjoong.product.domain.Keyboard;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyboardRepository extends JpaRepository<Keyboard, Integer> {
}
