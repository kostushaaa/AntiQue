package code.klein.demo.request.company;

import lombok.Builder;

import java.util.List;

@Builder
public record EditCompanyRequest(
        Long id,
        String name,
        Long directorId,
        List<Long> employeeIds
) {
}
