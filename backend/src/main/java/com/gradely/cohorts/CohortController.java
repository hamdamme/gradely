package com.gradely.cohorts;

import java.util.List;
import com.gradely.common.ApiException;
import com.gradely.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cohorts")
@PreAuthorize("hasAnyRole('INSTRUCTOR','ADMIN')")
public class CohortController {
    private final CohortRepository cohorts;
    public CohortController(CohortRepository cohorts) { this.cohorts = cohorts; }
    @GetMapping("/mine")
    public List<CohortRepository.Cohort> mine(@AuthenticationPrincipal User.Profile user) { return cohorts.forInstructor(user.id()); }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR','ADMIN') and @cohortAccess.canRead(#id, authentication.principal)")
    public CohortRepository.Cohort read(@PathVariable long id) {
        return cohorts.find(id).orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Cohort not found"));
    }
}
