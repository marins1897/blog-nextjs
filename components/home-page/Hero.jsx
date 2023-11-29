import Image from 'next/image';
import classes from './Hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src='/images/site/marin.png' alt='Marin Image' width={300} height={300} />
            </div>

            <h1>Hi, I'm Marin</h1>
            <p>I blog about web and blockchain development - especially React and Next frontend frameworks
                and blockchain networks Hyperledger Fabric and Ethereum.
            </p>
        </section>
    )
}

export default Hero;