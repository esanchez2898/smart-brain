import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      errorMessage: '' // Estado para almacenar el mensaje de error
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }

  onSubmitSignIn = () => {
    fetch('https://smart-brain-api-backend-0s21.onrender.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => {
        // Manejar casos de error de status aquí
        switch (response.status) {
          case 400:
            this.setState({ errorMessage: "Error 400: Solicitud incorrecta. Verifica los datos enviados." });
            break;
          case 404:
            this.setState({ errorMessage: "Error 404: Recurso no encontrado en el servidor." });
            break;
          case 406:
            this.setState({ errorMessage: "Error 406: La solicitud no es aceptable por el servidor." });
            break;
          default:
            this.setState({ errorMessage: "Error desconocido. Por favor, intenta nuevamente más tarde." });
            break;
        }
        return response.json();
      })
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        } else {
          this.setState({ errorMessage: "Credenciales incorrectas. Por favor, verifica e intenta nuevamente." });
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        this.setState({ errorMessage: "Error de red. Por favor, intenta nuevamente más tarde." });
      });
  }

  render() {
    const { onRouteChange } = this.props;
    const { errorMessage } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            {/* Mostrar mensaje de error si hay uno */}
            {errorMessage &&
              <div className="mv3">
                <p className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 red">{errorMessage}</p>
              </div>
            }
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
