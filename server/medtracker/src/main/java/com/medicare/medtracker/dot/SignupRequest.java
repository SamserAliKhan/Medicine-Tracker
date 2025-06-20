package com.medicare.medtracker.dot;

import lombok.*;
import jakarta.validation.constraints.*;
@Getter
@Setter
@NoArgsConstructor
public class SignupRequest {
    @NotBlank
    private String name;
    @Email
    private String email;
    @Size(min=8)
    private String password;
    @Pattern(regexp = "\\d{10}")
    private String Phone_number;
    @Min(1)
    @Max(120)
    private Integer age;
}
