export default function GetStarted () {
  return (
    <form>
      <div className='nes-field'>
        <input id='getStarted-email-field' className='nes-input' type='email' placeholder='Enter your email adress' />
      </div>
      <div className='nes-field'>
        <input id='getStarted-submit-button' className='nes-btn is-primary' type='submit' value='Get Started' />
        <span className='soother nes-text is-disabled'>Free forever.<br />No credit card.</span>
      </div>
      <style jsx>
        {`
          form {
            max-width: 30rem;
            margin: 0 auto;
          }
          #getStarted-submit-button {
            display: inline-block;
          }
          .nes-field:not(:last-of-type) {
            margin-bottom: 1rem;
          }
          input[type=email] {
            width: 100%;
          }
          .soother {
            display: inline-block;
            font-size: smaller;
            font-variant: small-caps;
            vertical-align: middle;
            margin-left: 1rem;
          }
        `}
      </style>
    </form>
  )
}
