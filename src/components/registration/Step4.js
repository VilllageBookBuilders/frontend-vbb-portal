import React from 'react';
import { Button } from 'antd';

function Step4(props) {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <div className="form-group step-form">
      <h1>Thanks for applying!</h1>
      <p>
        Thanks for applying! Please check your email for further instructions
        (mail sent to {props.email}). If you see an error message
        above, please follow the instructions it gives or&nbsp;
        <a href="mailto:mentor@villagebookbuilders.org">
          contact our mentor advisors
        </a>
        &nbsp;for more assistance.
      </p>
      <Button href='/signin/'>
        Sign In
      </Button>
    </div>
  );
}

export default Step4;
