package com.ssafy.zipjoong.recommand.repository;

import com.ssafy.zipjoong.recommand.domain.Combination;
import com.ssafy.zipjoong.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CombinationRepository extends JpaRepository<Combination, Long> {
    Optional<List<Combination>> findByUser(User user);
}
