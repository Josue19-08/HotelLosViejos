package com.hotelLosViejos.HotelLosViejos.Infraestructura.Servicios;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;

import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CorreoService {

    private final JavaMailSender mailSender;

    public void enviarCorreoReserva(Reserva reserva) {
        String asunto = "Confirmación de su Reserva en Hotel Los Viejos";
        String destinatario = reserva.getCliente().getCorreo();
        String html = generarContenidoHtmlReserva(reserva);

        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(html, true);

            mailSender.send(mensaje);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar el correo", e);
        }
    }

    private String generarContenidoHtmlReserva(Reserva reserva) {
        return """
        <html>
          <body style="margin:0;padding:0;background-color:#f4f4f4;">
            <table align="center" width="600" cellpadding="0" cellspacing="0"
                   style="font-family:'Segoe UI',sans-serif;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin:30px auto;">
              <tr>
                <td style="background-color:#005f73;padding:20px;text-align:center;color:white;">
                  <h1 style="margin:0;font-size:24px;">Hotel Los Viejos</h1>
                  <p style="margin:0;font-size:14px;">Confirmación de Reserva</p>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 40px;">
                  <h2 style="color:#0a0a0a;font-size:22px;">¡Gracias por su reserva!</h2>
                  <p style="font-size:16px;color:#333;">
                    Estimado <strong>%s %s</strong>,<br><br>
                    Su reserva ha sido registrada con éxito bajo el número <strong>%s</strong>.
                  </p>
                  <table width="100%%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                    <tr>
                      <td style="padding:10px 0;font-size:15px;color:#333;">Fecha de llegada:</td>
                      <td style="padding:10px 0;font-size:15px;color:#333;"><strong>%s</strong></td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;font-size:15px;color:#333;">Fecha de salida:</td>
                      <td style="padding:10px 0;font-size:15px;color:#333;"><strong>%s</strong></td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;font-size:15px;color:#333;">Habitación:</td>
                      <td style="padding:10px 0;font-size:15px;color:#333;"><strong>#%s</strong></td>
                    </tr>
                  </table>
                  <p style="margin-top:30px;font-size:16px;color:#333;">
                    Le esperamos con gusto en <strong>Hotel Los Viejos</strong>.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#e0e0e0;text-align:center;padding:15px;font-size:13px;color:#555;">
                  © %s Hotel Los Viejos. Todos los derechos reservados.
                </td>
              </tr>
            </table>
          </body>
        </html>
        """.formatted(
                reserva.getCliente().getNombre(),
                reserva.getCliente().getApellidos(),
                reserva.getNumeroReserva(),
                reserva.getFechaLlegada().toLocalDate(),
                reserva.getFechaSalida().toLocalDate(),
                reserva.getHabitacion().getNumero(),
                LocalDateTime.now().getYear()
        );
    }

}
