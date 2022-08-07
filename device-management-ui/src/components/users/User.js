import { Container } from '@mui/material';

const User = () => {
  return (
    <Container>
      <>
        <div>Aqui o Administrador poderá gerenciar os usuários do sistema.</div>
        <div>
          Cadastrar novos usuários, alterar níveis de accesso e excluir ou
          desativar usuários.
        </div>
        <div>
          Somente usuários com perfil de Administrador possum acesso à essa
          página
        </div>
      </>
    </Container>
  );
};

export { User };
