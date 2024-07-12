package dev.ehunter.runnerz.user;

public record User(
        Integer id,
        String name,
        String username,
        String email,
        Address address,
        String phone,
        String Website,
        Company company
) {
}
