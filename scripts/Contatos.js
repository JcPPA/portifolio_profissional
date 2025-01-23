/*ENVIO DOS DADOS PARA O BACK-END DATA.JSON */
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    // Validações básicas
    if (!email || !whatsapp || !message) {
        formMessage.textContent = 'Por favor, preencha os campos obrigatórios.';
        formMessage.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                whatsapp,
                subject,
                message,
            }),
        });

        if (response.ok) {
            formMessage.textContent = 'Mensagem enviada com sucesso!';
            formMessage.style.color = 'green';
            document.getElementById('contactForm').reset(); // Reseta o formulário
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao enviar a mensagem. Tente novamente.');
        }
    } catch (error) {
        formMessage.textContent = error.message;
        formMessage.style.color = 'red';
    }
});
