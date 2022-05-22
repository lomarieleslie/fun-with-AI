import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
        <footer>
     
        <p className='credit'>Built + Designed by:</p>
          <a className='footer-credit' href="https://www.linkedin.com/in/lorrainemleslie/"
            target={'_blank'} rel='noreferrer'>
            <p className='footer-credit'>Lorraine Leslie <FaLinkedin /></p>
          </a>
    </footer> 
        </div>
    )
}

export default Footer;