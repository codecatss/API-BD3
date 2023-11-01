package API3SEM.DTOS;

public record VerbaDTOs(
    Long diurno75,
    Long diurno100,
    Long noturno75,
    Long noturno100,
    Long sobreaviso,
    Long adn,
    Long total) {
        
    public record TotalHoras(
        String inicio,
        String fim) {
    }
}
