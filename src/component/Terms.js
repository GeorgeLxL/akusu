

import React, { Component } from 'react';


class Terms extends Component{   
  
    render(){
       
        return(
            <div className="container">
                <header>
                    <div className="content">
                        <button onClick={() => this.props.history.goBack()} className="back-button">
                            <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0401 20.5802L0.790059 11.45C0.400059 11.06 0.400059 10.4401 0.790059 10.0501L10.0401 0.92C10.6001 0.36 11.51 0.36 12.08 0.92C12.64 1.47 12.64 2.38001 12.08 2.93001L4.17006 10.7501L12.08 18.5701C12.64 19.1201 12.64 20.0302 12.08 20.5802C11.51 21.1402 10.6001 21.1402 10.0401 20.5802Z" fill="#6F738D"/>
                            </svg>
                        </button>
                        <h4>利用規約 | アプリ...</h4>
                        <button className="more-button">
                            <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 2C4 3.1 3.1 4 2 4C0.9 4 0 3.1 0 2C0 0.9 0.9 0 2 0C3.1 0 4 0.9 4 2ZM12 2C12 3.1 11.1 4 10 4C8.9 4 8 3.1 8 2C8 0.9 8.9 0 10 0C11.1 0 12 0.9 12 2ZM18 4C19.1 4 20 3.1 20 2C20 0.9 19.1 0 18 0C16.9 0 16 0.9 16 2C16 3.1 16.9 4 18 4Z" fill="#6F738D"/>
                            </svg>                        
                        </button>
                    </div>
                </header>
                <div className="main-title">
                    <h1>AKUSHU</h1>
                </div>
                <h3 className="privacy-h3">利用規約</h3>
                <p className="privacy-p">
                    Ea ex sint incididunt sint ex. Enim ea non labore enim consectetur. Aliqua elit eu mollit incididunt amet voluptate nulla minim ullamco. Sunt nostrud id ut sint cilium irure aliquip nisi mollit aute elit incididunt elit. Esse voluptate esse minim nulla esse occaecat proident culpa.<br/>
                    Reprehenderit cilium ea fugiat consequat voluptate mollit sunt Lorem est tempor cupidatat aliquip. Laborum quis magna adipisicing et pariatur tempor duis quis est esse. Aliquip non irure dolor nulla occaecat sunt tempor amet eiusmod exercitation aliqua cilium irure. Magna veniam dolor et ea laboris. Incididunt ipsum sunt tempor veniam velit.<br/>
                    Amet aute dolor nisi mollit aliqua. Excepteur esse in in amet aliqua irure. Esse tempor in reprehenderit proident id velit non do consectetur cupidatat eu aute consequat. Ut eu commodo adipisicing dolore dolore incididunt eu et magna dolor officia amet. Nostrud ex dolor culpa ut eu aliqua tempor incididunt in quis Lorem. Amet eiusmod amet aute ex minim sint sunt elit elit excepteur. Aute magna reprehenderit sint duis commodo ex non magna ut elit pariatur quis elit. Sunt labore elit quis ut nisi eiusmod occaecat. Sit quis ea dolor cupidatat proident occaecat veniam mollit laboris mollit. Ipsum voluptate deserunt adipisicing ex ut consectetur consequat magna labore cupidatat anim pariatur laborum. Laborum consectetur cilium ex magna reprehenderit proident in officia occaecat eu velit velit commodo.<br/>
                    Mollit velit ad eu tempor excepteur ex ex sunt elit fugiat ut. Proident excepteur non sit velit sunt deserunt elit eiusmod irure quis. Labore laborum aliqua officia nulla dolore dolor do in esse nostrud sit.<br/>
                    Quis eiusmod aliquip qui qui sint elit consequat ea pariatur quis eiusmod incididunt enim eu. Proident proident consequat labore reprehenderit aliqua occaecat ipsum nisi occaecat do Lorem veniam proident. Pariatur non duis culpa est nulla dolor in proident ex dolore voluptate non est Lorem.
                </p>
        </div>
        )
    }
}

export default Terms