package com.ssafy.zipjoong.product.repository;

import com.ssafy.zipjoong.product.domain.Mouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MouseRepository extends JpaRepository<Mouse, Integer> {
}
