import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg mt-3 overflow-hidden" style={{paddingLeft: '10px', overflow:"hidden"}}>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active" style={{marginRight: '20px', marginLeft: '50px'}}>
                        <svg width="282" height="72" viewBox="0 0 282 72" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_0_1)">
                                <circle cx="16" cy="16" r="16" fill="#4640DE"/>
                                <mask id="path-2-inside-1_0_1" fill="white">
                                    <path
                                        d="M16 27C18.6652 27 21.3304 24.8953 23.0607 23.179C23.4599 22.7831 22.9792 22.2122 22.4822 22.4749C20.6013 23.469 18.0181 24.6 16 24.6C13.9819 24.6 11.3987 23.469 9.5178 22.4749C9.02076 22.2122 8.54012 22.7831 8.93926 23.179C10.6696 24.8953 13.3348 27 16 27Z"/>
                                </mask>
                                <path
                                    d="M23.0607 23.179L25.1734 25.3089L25.1734 25.3089L23.0607 23.179ZM8.93926 23.179L6.82658 25.3089L6.82658 25.3089L8.93926 23.179ZM9.5178 22.4749L10.9197 19.8226L10.9197 19.8226L9.5178 22.4749ZM22.4822 22.4749L21.0803 19.8226L21.0803 19.8226L22.4822 22.4749ZM20.948 21.0491C20.1783 21.8126 19.2652 22.5953 18.3201 23.1712C17.3491 23.7627 16.5672 24 16 24V30C18.098 30 19.9813 29.1849 21.4419 28.2951C22.9282 27.3895 24.2129 26.2616 25.1734 25.3089L20.948 21.0491ZM16 24C15.4328 24 14.6509 23.7627 13.6799 23.1712C12.7348 22.5953 11.8217 21.8126 11.052 21.0491L6.82658 25.3089C7.78708 26.2616 9.07177 27.3895 10.5581 28.2951C12.0187 29.1849 13.902 30 16 30V24ZM8.11593 25.1272C9.1314 25.6639 10.3827 26.2629 11.6934 26.7336C12.967 27.1911 14.4921 27.6 16 27.6V21.6C15.4899 21.6 14.7143 21.4434 13.7216 21.0868C12.7658 20.7436 11.7851 20.28 10.9197 19.8226L8.11593 25.1272ZM16 27.6C17.5079 27.6 19.033 27.1911 20.3066 26.7336C21.6173 26.2629 22.8686 25.6639 23.8841 25.1272L21.0803 19.8226C20.2149 20.28 19.2342 20.7436 18.2784 21.0868C17.2857 21.4434 16.5101 21.6 16 21.6V27.6ZM25.1734 25.3089C25.7674 24.7197 26.1776 23.8995 26.2071 22.9593C26.2356 22.0551 25.905 21.2526 25.4152 20.663C24.4114 19.4547 22.6321 19.0024 21.0803 19.8226L23.8841 25.1272C22.8293 25.6847 21.5389 25.3865 20.7999 24.4969C20.4425 24.0667 20.1883 23.4648 20.2101 22.7708C20.2331 22.0407 20.5536 21.4403 20.948 21.0491L25.1734 25.3089ZM11.052 21.0491C11.4464 21.4403 11.7669 22.0407 11.7899 22.7708C11.8117 23.4648 11.5575 24.0667 11.2001 24.4969C10.4611 25.3865 9.17068 25.6847 8.11593 25.1272L10.9197 19.8226C9.36787 19.0024 7.5886 19.4547 6.58483 20.663C6.09504 21.2526 5.76443 22.0551 5.79286 22.9593C5.82241 23.8995 6.23259 24.7197 6.82658 25.3089L11.052 21.0491Z"
                                    fill="white" mask="url(#path-2-inside-1_0_1)"/>
                                <path
                                    d="M21.7117 9.31575C21.3918 8.99365 21.3918 8.47732 21.7117 8.15521L23.4302 6.02632L23.4302 5.98937C23.8655 5.55866 24.5713 5.55866 25.0067 5.98937C25.442 6.42007 25.442 7.11837 25.0067 7.54907L22.9819 9.31575L22.9063 9.38279C22.7482 9.50768 22.5511 9.57665 22.3468 9.57665C22.1085 9.57665 21.88 9.48277 21.7117 9.31575ZM8.6665 15.185C8.6665 13.2892 9.4277 11.4711 10.7826 10.1306C12.1376 8.79004 13.9753 8.03694 15.8914 8.03694C19.8817 8.03694 23.1164 11.2372 23.1164 15.185C23.1164 19.1327 19.8817 22.333 15.8914 22.333C11.9012 22.333 8.6665 19.1327 8.6665 15.185Z"
                                    fill="white"/>
                            </g>
                            <path
                                d="M51.24 30L45.04 2H51L54.8 20.96L60.24 2H65.72L71.16 20.92L74.96 2H80.72L74.56 30H68.44L62.92 10.48L57.32 30H51.24ZM97.0275 30.44C94.9475 30.44 93.0142 30.08 91.2275 29.36C89.4408 28.6133 87.8675 27.5867 86.5075 26.28C85.1742 24.9467 84.1208 23.4133 83.3475 21.68C82.6008 19.92 82.2275 18.0267 82.2275 16C82.2275 13.9733 82.6008 12.0933 83.3475 10.36C84.1208 8.6 85.1742 7.06667 86.5075 5.76C87.8675 4.42667 89.4408 3.4 91.2275 2.68C93.0142 1.93333 94.9475 1.56 97.0275 1.56C99.1075 1.56 101.041 1.93333 102.827 2.68C104.641 3.4 106.214 4.42667 107.547 5.76C108.907 7.06667 109.961 8.6 110.707 10.36C111.454 12.0933 111.827 13.9733 111.827 16C111.827 18.0267 111.454 19.92 110.707 21.68C109.961 23.4133 108.907 24.9467 107.547 26.28C106.214 27.5867 104.641 28.6133 102.827 29.36C101.041 30.08 99.1075 30.44 97.0275 30.44ZM97.0275 25.12C98.3075 25.12 99.4808 24.8933 100.547 24.44C101.614 23.96 102.547 23.32 103.347 22.52C104.147 21.6933 104.774 20.72 105.227 19.6C105.681 18.48 105.907 17.28 105.907 16C105.907 14.6933 105.681 13.4933 105.227 12.4C104.774 11.28 104.147 10.32 103.347 9.52C102.547 8.69333 101.614 8.05333 100.547 7.6C99.4808 7.12 98.3075 6.88 97.0275 6.88C95.7742 6.88 94.6142 7.12 93.5475 7.6C92.4808 8.05333 91.5475 8.69333 90.7475 9.52C89.9475 10.32 89.3208 11.28 88.8675 12.4C88.4142 13.4933 88.1875 14.68 88.1875 15.96C88.1875 17.2667 88.4142 18.48 88.8675 19.6C89.3208 20.72 89.9475 21.6933 90.7475 22.52C91.5475 23.32 92.4808 23.96 93.5475 24.44C94.6142 24.8933 95.7742 25.12 97.0275 25.12ZM119.581 30L113.381 2H119.341L123.141 20.96L128.581 2H134.061L139.501 20.92L143.301 2H149.061L142.901 30H136.781L131.261 10.48L125.661 30H119.581ZM158.745 30.4C155.945 30.4 153.572 29.6933 151.625 28.28C149.679 26.8667 148.279 24.84 147.425 22.2L152.785 20.16C153.372 21.8667 154.145 23.12 155.105 23.92C156.092 24.72 157.305 25.12 158.745 25.12C160.479 25.12 161.865 24.56 162.905 23.44C163.972 22.32 164.505 20.8267 164.505 18.96V2H170.305V19.12C170.305 21.3867 169.825 23.3733 168.865 25.08C167.905 26.76 166.559 28.0667 164.825 29C163.092 29.9333 161.065 30.4 158.745 30.4ZM188.21 30.44C186.13 30.44 184.197 30.08 182.41 29.36C180.624 28.6133 179.05 27.5867 177.69 26.28C176.357 24.9467 175.304 23.4133 174.53 21.68C173.784 19.92 173.41 18.0267 173.41 16C173.41 13.9733 173.784 12.0933 174.53 10.36C175.304 8.6 176.357 7.06667 177.69 5.76C179.05 4.42667 180.624 3.4 182.41 2.68C184.197 1.93333 186.13 1.56 188.21 1.56C190.29 1.56 192.224 1.93333 194.01 2.68C195.824 3.4 197.397 4.42667 198.73 5.76C200.09 7.06667 201.144 8.6 201.89 10.36C202.637 12.0933 203.01 13.9733 203.01 16C203.01 18.0267 202.637 19.92 201.89 21.68C201.144 23.4133 200.09 24.9467 198.73 26.28C197.397 27.5867 195.824 28.6133 194.01 29.36C192.224 30.08 190.29 30.44 188.21 30.44ZM188.21 25.12C189.49 25.12 190.664 24.8933 191.73 24.44C192.797 23.96 193.73 23.32 194.53 22.52C195.33 21.6933 195.957 20.72 196.41 19.6C196.864 18.48 197.09 17.28 197.09 16C197.09 14.6933 196.864 13.4933 196.41 12.4C195.957 11.28 195.33 10.32 194.53 9.52C193.73 8.69333 192.797 8.05333 191.73 7.6C190.664 7.12 189.49 6.88 188.21 6.88C186.957 6.88 185.797 7.12 184.73 7.6C183.664 8.05333 182.73 8.69333 181.93 9.52C181.13 10.32 180.504 11.28 180.05 12.4C179.597 13.4933 179.37 14.68 179.37 15.96C179.37 17.2667 179.597 18.48 180.05 19.6C180.504 20.72 181.13 21.6933 181.93 22.52C182.73 23.32 183.664 23.96 184.73 24.44C185.797 24.8933 186.957 25.12 188.21 25.12ZM206.629 30V2H219.789C221.683 2 223.336 2.32 224.749 2.96C226.163 3.6 227.269 4.50667 228.069 5.68C228.869 6.82667 229.269 8.16 229.269 9.68C229.269 10.9067 228.949 12.04 228.309 13.08C227.696 14.0933 226.856 14.92 225.789 15.56C227.149 16.2 228.229 17.0667 229.029 18.16C229.829 19.2533 230.229 20.4933 230.229 21.88C230.229 23.48 229.816 24.8933 228.989 26.12C228.189 27.3467 227.043 28.3067 225.549 29C224.083 29.6667 222.376 30 220.429 30H206.629ZM212.429 13.44H219.429C220.683 13.44 221.669 13.1467 222.389 12.56C223.136 11.9467 223.509 11.1333 223.509 10.12C223.509 9.10667 223.136 8.30667 222.389 7.72C221.669 7.10666 220.683 6.8 219.429 6.8H212.429V13.44ZM212.429 25.2H219.989C221.323 25.2 222.389 24.88 223.189 24.24C223.989 23.5733 224.389 22.6933 224.389 21.6C224.389 20.48 223.989 19.6 223.189 18.96C222.389 18.2933 221.323 17.96 219.989 17.96H212.429V25.2ZM243.886 30.4C241.619 30.4 239.406 29.9867 237.246 29.16C235.086 28.3067 233.166 27.1067 231.486 25.56L234.806 21.4C236.432 22.84 237.992 23.88 239.486 24.52C241.006 25.16 242.606 25.48 244.286 25.48C245.459 25.48 246.472 25.3467 247.326 25.08C248.179 24.7867 248.832 24.3733 249.286 23.84C249.766 23.3067 250.006 22.68 250.006 21.96C250.006 21 249.659 20.2667 248.966 19.76C248.272 19.2267 247.086 18.8133 245.406 18.52L239.846 17.56C237.472 17.16 235.659 16.32 234.406 15.04C233.179 13.76 232.566 12.1067 232.566 10.08C232.566 8.34667 233.006 6.84 233.886 5.56C234.792 4.28 236.059 3.30667 237.686 2.64C239.339 1.94667 241.299 1.6 243.566 1.6C245.619 1.6 247.659 1.94667 249.686 2.64C251.739 3.33333 253.552 4.29333 255.126 5.52L252.006 9.84C249.072 7.6 246.126 6.48 243.166 6.48C242.126 6.48 241.219 6.61333 240.446 6.88C239.672 7.14667 239.072 7.52 238.646 8C238.246 8.45333 238.046 9 238.046 9.64C238.046 10.4933 238.352 11.16 238.966 11.64C239.579 12.0933 240.606 12.44 242.046 12.68L247.326 13.56C250.126 14.0133 252.219 14.9067 253.606 16.24C254.992 17.5467 255.686 19.28 255.686 21.44C255.686 23.2533 255.206 24.84 254.246 26.2C253.286 27.5333 251.912 28.5733 250.126 29.32C248.366 30.04 246.286 30.4 243.886 30.4Z"
                                fill="#202430"/>
                            <defs>
                                <clipPath id="clip0_0_1">
                                    <rect width="32" height="32" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </li>
                    <li className="nav-item active" style={{marginRight: '20px'}}>
                        <Link to="/" className="nav-link text-dark" style={{fontSize: "large"}}>Home</Link>
                    </li>
                    <li className="nav-item active" style={{marginRight: '20px'}}>
                        <Link to="/" className="nav-link text-dark" style={{fontSize: "large"}}>Find Jobs</Link>
                    </li>
                    <li className="nav-item active" style={{marginRight: '20px'}}>
                        <Link to="/" className="nav-link text-dark" style={{fontSize: "large"}}>Post Jobs</Link>
                    </li>
                </ul>

                <div className="d-flex justify-content-end">
                    <button className="btn my-2 my-sm-0 text-dark" type="submit"
                            style={{marginRight: '20px', fontSize: "large"}}><Link to={"/login"} className="btn btn-warning">Login</Link>
                    </button>
                    <button className="btn text-light btn-success" style={{
                        marginRight: '50px'
                    }}><Link to={"/signup"} className="btn btn-success">Sign Up</Link>
                    </button>
                </div>

            </div>
        </nav>
    );
}
