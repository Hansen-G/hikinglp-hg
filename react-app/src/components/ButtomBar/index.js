import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './ButtomBar.css'

function ButtomBar() {
    return (
        <div className='buttomBarContiner' >
            <div className='buttomBar'>


                <div className='toolBarContiner flex'>
                    
                    <div className='tooBar'>
                        <p className='barTitle'>
                            <a href='https://github.com/Hansen-G/hikinglp-hg' target='_blank' rel="noreferrer">Hikinglp Github</a>
                            
                        </p>
                    </div>
                </div>

                <div className='bar3 flex'>


                    <div className='followMe'>
                        <p className='follow-me-title'>
                            Follow me
                        </p>
                        <div className='followMe'>
                            <a href='https://www.facebook.com/profile.php?id=100012690077303' className='toobarLink'>
                                <i className="fa-brands fa-facebook fa-2x followMeIcon"></i>
                            </a>
                            <a href='https://www.instagram.com/hansen.guo/' className='toobarLink'>
                                <i className="fa-brands fa-instagram fa-2x followMeIcon"></i>
                            </a>

                            <a href='https://www.linkedin.com/in/hansen-guo/' className='toobarLink'>
                                <i className="fa-brands fa-linkedin fa-2x followMeIcon"></i>
                            </a>
                            
                            <a href='https://github.com/Hansen-G' className='toobarLink'>
                                <i className="fa-brands fa-github fa-2x followMeIcon"></i>
                            </a>

                        </div>

                    </div>
                </div>

                <div className='copy-right'>
                    Copyright ?? 2022, Hikinglp and related marks are registered trademarks of Hikinglp.

                </div>

            </div>

        </div>
    
    ) 
};
export default ButtomBar;
