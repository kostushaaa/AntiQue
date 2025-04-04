package code.klein.demo.controller;

import code.klein.demo.entity.Company;
import code.klein.demo.request.company.CreateCompanyRequest;
import code.klein.demo.request.company.EditCompanyRequest;
import code.klein.demo.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @PostMapping("/companies/new")
    public ResponseEntity<Company> createCompany(@RequestBody CreateCompanyRequest request) {
        Company company = companyService.createCompany(request);
        return ResponseEntity.ok(company);
    }

    @PostMapping("/companies/edit")
    public ResponseEntity<Company> editCompany(@RequestBody EditCompanyRequest request) {
        Company company = companyService.editCompany(request);
        return ResponseEntity.ok(company);
    }
}
