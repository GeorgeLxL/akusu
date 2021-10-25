import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';

const en = {
    coming_soon:"Coming soon",
}

const jp={
    coming_soon:"Coming soon",
}

class ComingSoon extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            language:JSON.parse(localStorage.language).language,
        }
    }

    render(){
        const { language } = this.state
        return(
        <div class="container">
            <Header  pageName={eval(language).coming_soon}/>
            <div class="coming">
                <h2>Coming <br/><span>soon!</span></h2>
            </div>
            <Footer/>
        </div>
        )
    }
}

export default ComingSoon
