package API3SEM.utills.DatabaseInitialization;

import java.util.ArrayList;
import java.util.Random;

public class Justificativas {
    
    public static String getJusLan(){
        Random random = new Random();
        ArrayList<String> jusLan = new ArrayList<String>();
        jusLan.add("Solicitação gestor");
        jusLan.add("Solicitação ADM");
        jusLan.add("Solicitação cliente");

        return jusLan.get(random.nextInt(jusLan.size()));
    }

    public static String getJusNeg(){
        Random random = new Random();

        ArrayList<String> jusNeg = new ArrayList<String>();
        jusNeg.add("Negado pelo RH");
        jusNeg.add("Não atenden aos requisitos");
        jusNeg.add("Excedeu o limite de horas");

        return jusNeg.get(random.nextInt(jusNeg.size()));
    }

}
