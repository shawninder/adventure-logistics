export default function GetStarted () {
  return (
    <form>
      <div className='nes-field'>
        <input id='getStarted-email-field' className='field nes-input' type='email' placeholder='Enter your email address' />
      </div>
      <div className='nes-field'>
        <input id='getStarted-submit-button' className='field nes-btn is-primary' type='submit' value='Get Started' />
        <span className='soother nes-text is-disabled'>Free forever.<br />No credit card.</span>
      </div>
      <style jsx>
        {`
          form {
            margin: .5rem auto 0;
          }
          .field {
            margin: .5rem;
            width: calc(100% - (2 * .5rem));
          }
          #getStarted-email-field, #getStarted-email-field::placeholder {
            font-size: .6rem;
          }
          #getStarted-submit-button {
            font-size: .8rem;
          }
          .soother {
            font-size: smaller;
            font-variant: small-caps;
            display: inline-block;
          }
        `}
      </style>
    </form>
  )
}
