package code.klein.demo.request.company;

import lombok.Builder;

import java.util.List;

@Builder
public record CreateCompanyRequest(
        String name,
        Long directorId,
        List<Long> employeeIds
) {
}
