// UserDTO.java (inside dot/)
package com.medicare.medtracker.dot;

public class UserDTO {
    public String name;
    public String email;
    public String phoneNumber;
    public int age;

    public UserDTO(String name, String email, String phoneNumber, int age) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.age = age;
    }
}
