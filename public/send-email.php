<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit;
}

$name = isset($input['Nombre']) ? strip_tags(trim($input['Nombre'])) : '';
$email = isset($input['Email']) ? filter_var(trim($input['Email']), FILTER_VALIDATE_EMAIL) : '';
$company = isset($input['Empresa']) ? strip_tags(trim($input['Empresa'])) : 'No especificada';
$interest = isset($input['Interés']) ? strip_tags(trim($input['Interés'])) : 'No especificado';
$message = isset($input['Mensaje']) ? strip_tags(trim($input['Mensaje'])) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Faltan campos obligatorios (Nombre, Email, Mensaje)"]);
    exit;
}

// 1. Enviar correo al destinatario (LexiaCode)
$to = "contact@lexiacode.com";
$subject = "Nuevo Mensaje de Contacto - LexiaCode";

$email_content = "
<html>
<head>
<title>Nuevo mensaje de contacto</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>
  <div style='max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;'>
    <div style='background-color: #07080a; padding: 20px; text-align: center; color: #fff;'>
      <h2 style='margin: 0; color: #e87722;'>LexiaCode</h2>
      <p style='margin: 5px 0 0 0; font-size: 14px;'>Nueva consulta desde la web</p>
    </div>
    <div style='padding: 24px;'>
      <table style='width: 100%; border-collapse: collapse;'>
        <tr style='border-bottom: 1px solid #f0f0f0;'>
          <td style='padding: 10px 0; font-weight: bold; width: 150px;'>Nombre:</td>
          <td style='padding: 10px 0;'>$name</td>
        </tr>
        <tr style='border-bottom: 1px solid #f0f0f0;'>
          <td style='padding: 10px 0; font-weight: bold;'>Email:</td>
          <td style='padding: 10px 0;'><a href='mailto:$email'>$email</a></td>
        </tr>
        <tr style='border-bottom: 1px solid #f0f0f0;'>
          <td style='padding: 10px 0; font-weight: bold;'>Empresa:</td>
          <td style='padding: 10px 0;'>$company</td>
        </tr>
        <tr style='border-bottom: 1px solid #f0f0f0;'>
          <td style='padding: 10px 0; font-weight: bold;'>Interés:</td>
          <td style='padding: 10px 0;'>$interest</td>
        </tr>
        <tr>
          <td style='padding: 10px 0; font-weight: bold; vertical-align: top;'>Mensaje:</td>
          <td style='padding: 10px 0; white-space: pre-wrap;'>$message</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: LexiaCode Form <contact@lexiacode.com>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

$mail_sent = mail($to, $subject, $email_content, $headers);

// 2. Enviar correo de autorespuesta al remitente (Cliente)
$auto_subject = "Hemos recibido tu consulta - LexiaCode";
$auto_content = "
<html>
<head>
<title>Contacto LexiaCode</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f9f9f9; padding: 20px 0;'>
  <div style='max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);'>
    <div style='background-color: #07080a; padding: 30px 20px; text-align: center;'>
      <div style='font-size: 24px; font-weight: bold; color: #ffffff;'>
        Lexia<span style='color: #e87722;'>Code</span>
      </div>
      <p style='color: #9ca3af; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px;'>AI &middot; WEB3 &middot; RWA TOKENIZATION</p>
    </div>
    <div style='padding: 32px 24px;'>
      <h2 style='margin-top: 0; color: #111827; font-size: 20px;'>¡Hola, $name!</h2>
      <p style='color: #4b5563; font-size: 15px;'>Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje correctamente.</p>
      
      <div style='background-color: #f3f4f6; border-left: 4px solid #e87722; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;'>
        <p style='margin: 0; font-weight: bold; color: #1f2937; font-size: 14px;'>¿Qué sucede ahora?</p>
        <p style='margin: 4px 0 0 0; color: #4b5563; font-size: 13px;'>Nuestro equipo técnico y legal revisará los detalles de tu consulta. Uno de nuestros analistas se pondrá en contacto contigo en las próximas 24 horas para agendar una sesión estratégica personalizada.</p>
      </div>

      <p style='color: #4b5563; font-size: 15px; margin-bottom: 30px;'>Mientras tanto, te invitamos a explorar nuestra plataforma y leer nuestro Whitepaper de soluciones de tokenización de activos del mundo real (RWA) en nuestro sitio web.</p>
      
      <div style='border-top: 1px solid #f3f4f6; padding-top: 20px; text-align: center;'>
        <a href='https://lexiacode.com' style='display: inline-block; background-color: #e87722; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; font-size: 14px; box-shadow: 0 2px 4px rgba(232, 119, 34, 0.2);'>Visitar LexiaCode</a>
      </div>
    </div>
    <div style='background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6; color: #9ca3af; font-size: 11px;'>
      <p style='margin: 0;'>&copy; " . date("Y") . " LexiaCode. Todos los derechos reservados.</p>
      <p style='margin: 5px 0 0 0;'>Este es un correo automático, por favor no respondas a este mensaje.</p>
    </div>
  </div>
</body>
</html>
";

$auto_headers = "MIME-Version: 1.0" . "\r\n";
$auto_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$auto_headers .= "From: LexiaCode <contact@lexiacode.com>" . "\r\n";

$auto_sent = mail($email, $auto_subject, $auto_content, $auto_headers);

echo json_encode([
    "success" => true,
    "message" => "Mensajes procesados correctamente",
    "debug" => [
        "mail_to_us" => $mail_sent,
        "mail_to_client" => $auto_sent
    ]
]);
