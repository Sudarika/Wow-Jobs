import React from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import HomeImg from "../../assets/HomeImg.png";

export default function HomePage() {
    return (
        <div className="container-fluid">
            <NavBar/>
            <div className="row">
                <div className="col-lg-6 col-md-12 mt-5 mx-5">
                    <div className="row mx-5">
                        <svg width="606" height="266" viewBox="0 0 606 266" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.4844 0.75L29.4844 32.5781L44.5781 0.75H58.7344L36.0469 44.0156V69H22.9688V44.0156L0.234375 0.75H14.4844ZM59.3438 44.1562V43.1719C59.3438 39.4531 59.875 36.0312 60.9375 32.9062C62 29.75 63.5469 27.0156 65.5781 24.7031C67.6094 22.3906 70.0938 20.5938 73.0312 19.3125C75.9688 18 79.3125 17.3438 83.0625 17.3438C86.875 17.3438 90.25 18 93.1875 19.3125C96.1562 20.5938 98.6562 22.3906 100.688 24.7031C102.719 27.0156 104.266 29.75 105.328 32.9062C106.391 36.0312 106.922 39.4531 106.922 43.1719V44.1562C106.922 47.8438 106.391 51.2656 105.328 54.4219C104.266 57.5469 102.719 60.2812 100.688 62.625C98.6562 64.9375 96.1719 66.7344 93.2344 68.0156C90.2969 69.2969 86.9375 69.9375 83.1562 69.9375C79.4062 69.9375 76.0469 69.2969 73.0781 68.0156C70.1094 66.7344 67.6094 64.9375 65.5781 62.625C63.5469 60.2812 62 57.5469 60.9375 54.4219C59.875 51.2656 59.3438 47.8438 59.3438 44.1562ZM71.7188 43.1719V44.1562C71.7188 46.375 71.9375 48.4531 72.375 50.3906C72.8125 52.3281 73.4844 54.0312 74.3906 55.5C75.2969 56.9688 76.4688 58.125 77.9062 58.9688C79.375 59.7812 81.125 60.1875 83.1562 60.1875C85.1562 60.1875 86.875 59.7812 88.3125 58.9688C89.75 58.125 90.9219 56.9688 91.8281 55.5C92.7656 54.0312 93.4531 52.3281 93.8906 50.3906C94.3281 48.4531 94.5469 46.375 94.5469 44.1562V43.1719C94.5469 40.9844 94.3281 38.9375 93.8906 37.0312C93.4531 35.0938 92.7656 33.3906 91.8281 31.9219C90.9219 30.4219 89.7344 29.25 88.2656 28.4062C86.8281 27.5312 85.0938 27.0938 83.0625 27.0938C81.0625 27.0938 79.3438 27.5312 77.9062 28.4062C76.4688 29.25 75.2969 30.4219 74.3906 31.9219C73.4844 33.3906 72.8125 35.0938 72.375 37.0312C71.9375 38.9375 71.7188 40.9844 71.7188 43.1719ZM146.109 56.9531V18.2812H158.578V69H146.859L146.109 56.9531ZM147.703 46.4531L151.547 46.3594C151.547 49.7656 151.172 52.9062 150.422 55.7812C149.672 58.6562 148.5 61.1562 146.906 63.2812C145.344 65.375 143.359 67.0156 140.953 68.2031C138.547 69.3594 135.703 69.9375 132.422 69.9375C129.922 69.9375 127.641 69.5938 125.578 68.9062C123.516 68.1875 121.734 67.0781 120.234 65.5781C118.766 64.0469 117.625 62.0938 116.812 59.7188C116 57.3125 115.594 54.4219 115.594 51.0469V18.2812H127.969V51.1406C127.969 52.8281 128.156 54.2344 128.531 55.3594C128.938 56.4844 129.484 57.4062 130.172 58.125C130.891 58.8125 131.719 59.3125 132.656 59.625C133.625 59.9062 134.656 60.0469 135.75 60.0469C138.75 60.0469 141.109 59.4531 142.828 58.2656C144.578 57.0469 145.828 55.4219 146.578 53.3906C147.328 51.3281 147.703 49.0156 147.703 46.4531ZM181.922 28.6406V69H169.547V18.2812H181.266L181.922 28.6406ZM197.344 17.9531L197.156 29.4844C196.469 29.3594 195.688 29.2656 194.812 29.2031C193.969 29.1406 193.172 29.1094 192.422 29.1094C190.516 29.1094 188.844 29.375 187.406 29.9062C185.969 30.4062 184.766 31.1406 183.797 32.1094C182.859 33.0781 182.141 34.2656 181.641 35.6719C181.141 37.0469 180.859 38.6094 180.797 40.3594L178.125 40.0312C178.125 36.8125 178.453 33.8281 179.109 31.0781C179.766 28.3281 180.719 25.9219 181.969 23.8594C183.219 21.7969 184.781 20.2031 186.656 19.0781C188.562 17.9219 190.75 17.3438 193.219 17.3438C193.906 17.3438 194.641 17.4062 195.422 17.5312C196.234 17.625 196.875 17.7656 197.344 17.9531ZM249.375 69H234.656L234.75 58.875H249.375C253.344 58.875 256.672 58 259.359 56.25C262.047 54.4688 264.078 51.9219 265.453 48.6094C266.828 45.2656 267.516 41.2656 267.516 36.6094V33.0938C267.516 29.5 267.125 26.3281 266.344 23.5781C265.562 20.8281 264.406 18.5156 262.875 16.6406C261.375 14.7656 259.516 13.3438 257.297 12.375C255.078 11.4062 252.531 10.9219 249.656 10.9219H234.375V0.75H249.656C254.219 0.75 258.375 1.51562 262.125 3.04688C265.906 4.57813 269.172 6.78125 271.922 9.65625C274.703 12.5 276.828 15.9062 278.297 19.875C279.797 23.8438 280.547 28.2812 280.547 33.1875V36.6094C280.547 41.4844 279.797 45.9219 278.297 49.9219C276.828 53.8906 274.703 57.2969 271.922 60.1406C269.172 62.9844 265.891 65.1719 262.078 66.7031C258.266 68.2344 254.031 69 249.375 69ZM241.875 0.75V69H228.984V0.75H241.875ZM302.953 28.6406V69H290.578V18.2812H302.297L302.953 28.6406ZM318.375 17.9531L318.188 29.4844C317.5 29.3594 316.719 29.2656 315.844 29.2031C315 29.1406 314.203 29.1094 313.453 29.1094C311.547 29.1094 309.875 29.375 308.438 29.9062C307 30.4062 305.797 31.1406 304.828 32.1094C303.891 33.0781 303.172 34.2656 302.672 35.6719C302.172 37.0469 301.891 38.6094 301.828 40.3594L299.156 40.0312C299.156 36.8125 299.484 33.8281 300.141 31.0781C300.797 28.3281 301.75 25.9219 303 23.8594C304.25 21.7969 305.812 20.2031 307.688 19.0781C309.594 17.9219 311.781 17.3438 314.25 17.3438C314.938 17.3438 315.672 17.4062 316.453 17.5312C317.266 17.625 317.906 17.7656 318.375 17.9531ZM347.016 69.9375C343.172 69.9375 339.719 69.3125 336.656 68.0625C333.594 66.8125 330.984 65.0781 328.828 62.8594C326.703 60.6094 325.062 58 323.906 55.0312C322.781 52.0312 322.219 48.8125 322.219 45.375V43.5C322.219 39.5938 322.781 36.0469 323.906 32.8594C325.031 29.6406 326.625 26.875 328.688 24.5625C330.75 22.25 333.219 20.4688 336.094 19.2188C338.969 17.9688 342.141 17.3438 345.609 17.3438C349.203 17.3438 352.375 17.9531 355.125 19.1719C357.875 20.3594 360.172 22.0469 362.016 24.2344C363.859 26.4219 365.25 29.0469 366.188 32.1094C367.125 35.1406 367.594 38.5 367.594 42.1875V47.3906H327.844V38.8594H355.406V37.9219C355.344 35.9531 354.969 34.1562 354.281 32.5312C353.594 30.875 352.531 29.5625 351.094 28.5938C349.656 27.5938 347.797 27.0938 345.516 27.0938C343.672 27.0938 342.062 27.5 340.688 28.3125C339.344 29.0938 338.219 30.2188 337.312 31.6875C336.438 33.125 335.781 34.8438 335.344 36.8438C334.906 38.8438 334.688 41.0625 334.688 43.5V45.375C334.688 47.5 334.969 49.4688 335.531 51.2812C336.125 53.0938 336.984 54.6719 338.109 56.0156C339.266 57.3281 340.641 58.3594 342.234 59.1094C343.859 59.8281 345.703 60.1875 347.766 60.1875C350.359 60.1875 352.703 59.6875 354.797 58.6875C356.922 57.6562 358.766 56.1406 360.328 54.1406L366.562 60.6094C365.5 62.1719 364.062 63.6719 362.25 65.1094C360.469 66.5469 358.312 67.7188 355.781 68.625C353.25 69.5 350.328 69.9375 347.016 69.9375ZM403.828 58.2188V34.8281C403.828 33.1094 403.531 31.625 402.938 30.375C402.344 29.125 401.438 28.1562 400.219 27.4688C399 26.7812 397.453 26.4375 395.578 26.4375C393.922 26.4375 392.469 26.7188 391.219 27.2812C390 27.8438 389.062 28.6406 388.406 29.6719C387.75 30.6719 387.422 31.8281 387.422 33.1406H375C375 31.0469 375.5 29.0625 376.5 27.1875C377.5 25.2812 378.922 23.5938 380.766 22.125C382.641 20.625 384.875 19.4531 387.469 18.6094C390.094 17.7656 393.031 17.3438 396.281 17.3438C400.125 17.3438 403.547 18 406.547 19.3125C409.578 20.5938 411.953 22.5312 413.672 25.125C415.422 27.7188 416.297 30.9844 416.297 34.9219V57.0469C416.297 59.5781 416.453 61.75 416.766 63.5625C417.109 65.3438 417.609 66.8906 418.266 68.2031V69H405.656C405.062 67.7188 404.609 66.0938 404.297 64.125C403.984 62.125 403.828 60.1562 403.828 58.2188ZM405.562 38.1094L405.656 45.4688H397.828C395.891 45.4688 394.188 45.6719 392.719 46.0781C391.25 46.4531 390.047 47.0156 389.109 47.7656C388.172 48.4844 387.469 49.3594 387 50.3906C386.531 51.3906 386.297 52.5312 386.297 53.8125C386.297 55.0625 386.578 56.1875 387.141 57.1875C387.734 58.1875 388.578 58.9844 389.672 59.5781C390.797 60.1406 392.109 60.4219 393.609 60.4219C395.797 60.4219 397.703 59.9844 399.328 59.1094C400.953 58.2031 402.219 57.1094 403.125 55.8281C404.031 54.5469 404.516 53.3281 404.578 52.1719L408.141 57.5156C407.703 58.7969 407.047 60.1562 406.172 61.5938C405.297 63.0312 404.172 64.375 402.797 65.625C401.422 66.875 399.766 67.9062 397.828 68.7188C395.891 69.5312 393.641 69.9375 391.078 69.9375C387.797 69.9375 384.859 69.2812 382.266 67.9688C379.672 66.6562 377.625 64.8594 376.125 62.5781C374.625 60.2969 373.875 57.7031 373.875 54.7969C373.875 52.1094 374.375 49.7344 375.375 47.6719C376.375 45.6094 377.859 43.875 379.828 42.4688C381.797 41.0312 384.234 39.9531 387.141 39.2344C390.078 38.4844 393.438 38.1094 397.219 38.1094H405.562ZM439.781 28.6875V69H427.406V18.2812H439.078L439.781 28.6875ZM437.953 41.8125H434.156C434.156 38.2812 434.578 35.0312 435.422 32.0625C436.297 29.0938 437.578 26.5156 439.266 24.3281C440.953 22.1094 443.031 20.3906 445.5 19.1719C448 17.9531 450.891 17.3438 454.172 17.3438C456.453 17.3438 458.547 17.6875 460.453 18.375C462.359 19.0312 464 20.0781 465.375 21.5156C466.781 22.9219 467.859 24.7656 468.609 27.0469C469.359 29.2969 469.734 32 469.734 35.1562V69H457.359V36.4219C457.359 34.0469 457.016 32.1875 456.328 30.8438C455.672 29.5 454.719 28.5625 453.469 28.0312C452.219 27.4688 450.719 27.1875 448.969 27.1875C447.031 27.1875 445.359 27.5781 443.953 28.3594C442.578 29.1094 441.438 30.1562 440.531 31.5C439.656 32.8438 439 34.3906 438.562 36.1406C438.156 37.8906 437.953 39.7812 437.953 41.8125ZM468.797 39.5156L463.688 40.4531C463.719 37.2656 464.156 34.2812 465 31.5C465.844 28.6875 467.078 26.2344 468.703 24.1406C470.359 22.0156 472.406 20.3594 474.844 19.1719C477.312 17.9531 480.156 17.3438 483.375 17.3438C485.875 17.3438 488.125 17.7031 490.125 18.4219C492.156 19.1094 493.891 20.2188 495.328 21.75C496.766 23.25 497.859 25.2031 498.609 27.6094C499.391 30.0156 499.781 32.9531 499.781 36.4219V69H487.312V36.375C487.312 33.9062 486.969 32.0156 486.281 30.7031C485.625 29.3906 484.672 28.4844 483.422 27.9844C482.172 27.4531 480.703 27.1875 479.016 27.1875C477.297 27.1875 475.797 27.5156 474.516 28.1719C473.266 28.7969 472.203 29.6719 471.328 30.7969C470.484 31.9219 469.844 33.2344 469.406 34.7344C469 36.2031 468.797 37.7969 468.797 39.5156Z"
                                fill="#333333"/>
                            <path
                                d="M34.3594 161.281V113.75H47.25V161.281C47.25 165.812 46.2656 169.703 44.2969 172.953C42.3281 176.172 39.6406 178.641 36.2344 180.359C32.8281 182.078 28.9844 182.938 24.7031 182.938C20.2969 182.938 16.3906 182.203 12.9844 180.734C9.57812 179.234 6.90625 176.953 4.96875 173.891C3.0625 170.828 2.10938 166.938 2.10938 162.219H15.0469C15.0469 164.781 15.4375 166.844 16.2188 168.406C17 169.969 18.1094 171.094 19.5469 171.781C21.0156 172.469 22.7344 172.812 24.7031 172.812C26.6094 172.812 28.2812 172.375 29.7188 171.5C31.1875 170.594 32.3281 169.281 33.1406 167.562C33.9531 165.844 34.3594 163.75 34.3594 161.281ZM56.9062 157.156V156.172C56.9062 152.453 57.4375 149.031 58.5 145.906C59.5625 142.75 61.1094 140.016 63.1406 137.703C65.1719 135.391 67.6562 133.594 70.5938 132.312C73.5312 131 76.875 130.344 80.625 130.344C84.4375 130.344 87.8125 131 90.75 132.312C93.7188 133.594 96.2188 135.391 98.25 137.703C100.281 140.016 101.828 142.75 102.891 145.906C103.953 149.031 104.484 152.453 104.484 156.172V157.156C104.484 160.844 103.953 164.266 102.891 167.422C101.828 170.547 100.281 173.281 98.25 175.625C96.2188 177.938 93.7344 179.734 90.7969 181.016C87.8594 182.297 84.5 182.938 80.7188 182.938C76.9688 182.938 73.6094 182.297 70.6406 181.016C67.6719 179.734 65.1719 177.938 63.1406 175.625C61.1094 173.281 59.5625 170.547 58.5 167.422C57.4375 164.266 56.9062 160.844 56.9062 157.156ZM69.2812 156.172V157.156C69.2812 159.375 69.5 161.453 69.9375 163.391C70.375 165.328 71.0469 167.031 71.9531 168.5C72.8594 169.969 74.0312 171.125 75.4688 171.969C76.9375 172.781 78.6875 173.188 80.7188 173.188C82.7188 173.188 84.4375 172.781 85.875 171.969C87.3125 171.125 88.4844 169.969 89.3906 168.5C90.3281 167.031 91.0156 165.328 91.4531 163.391C91.8906 161.453 92.1094 159.375 92.1094 157.156V156.172C92.1094 153.984 91.8906 151.938 91.4531 150.031C91.0156 148.094 90.3281 146.391 89.3906 144.922C88.4844 143.422 87.2969 142.25 85.8281 141.406C84.3906 140.531 82.6562 140.094 80.625 140.094C78.625 140.094 76.9062 140.531 75.4688 141.406C74.0312 142.25 72.8594 143.422 71.9531 144.922C71.0469 146.391 70.375 148.094 69.9375 150.031C69.5 151.938 69.2812 153.984 69.2812 156.172ZM113.438 110H125.859V170.797L124.641 182H113.438V110ZM158.484 156.125V157.109C158.484 160.891 158.062 164.359 157.219 167.516C156.406 170.672 155.172 173.406 153.516 175.719C151.859 178 149.797 179.781 147.328 181.062C144.891 182.312 142.031 182.938 138.75 182.938C135.625 182.938 132.906 182.328 130.594 181.109C128.312 179.891 126.391 178.172 124.828 175.953C123.266 173.703 122.016 171.062 121.078 168.031C120.141 164.969 119.438 161.625 118.969 158V155.328C119.438 151.672 120.141 148.328 121.078 145.297C122.016 142.266 123.266 139.625 124.828 137.375C126.391 135.125 128.312 133.391 130.594 132.172C132.875 130.953 135.562 130.344 138.656 130.344C141.969 130.344 144.859 130.984 147.328 132.266C149.828 133.516 151.891 135.297 153.516 137.609C155.172 139.891 156.406 142.609 157.219 145.766C158.062 148.891 158.484 152.344 158.484 156.125ZM146.062 157.109V156.125C146.062 153.969 145.891 151.938 145.547 150.031C145.203 148.094 144.641 146.391 143.859 144.922C143.078 143.453 142.016 142.297 140.672 141.453C139.328 140.609 137.641 140.188 135.609 140.188C133.672 140.188 132.016 140.516 130.641 141.172C129.297 141.828 128.172 142.734 127.266 143.891C126.391 145.047 125.703 146.406 125.203 147.969C124.734 149.531 124.422 151.219 124.266 153.031V160.344C124.484 162.75 125 164.922 125.812 166.859C126.625 168.766 127.828 170.281 129.422 171.406C131.047 172.531 133.141 173.094 135.703 173.094C137.703 173.094 139.375 172.703 140.719 171.922C142.062 171.109 143.125 169.984 143.906 168.547C144.688 167.078 145.234 165.375 145.547 163.438C145.891 161.5 146.062 159.391 146.062 157.109ZM206.062 113.75V182H193.172V113.75H206.062ZM246.938 168.125C246.938 167.062 246.656 166.109 246.094 165.266C245.531 164.422 244.469 163.656 242.906 162.969C241.375 162.25 239.125 161.578 236.156 160.953C233.531 160.391 231.109 159.688 228.891 158.844C226.672 158 224.766 156.984 223.172 155.797C221.578 154.578 220.328 153.156 219.422 151.531C218.547 149.875 218.109 147.969 218.109 145.812C218.109 143.719 218.562 141.75 219.469 139.906C220.375 138.031 221.688 136.391 223.406 134.984C225.125 133.547 227.219 132.422 229.688 131.609C232.156 130.766 234.938 130.344 238.031 130.344C242.344 130.344 246.047 131.047 249.141 132.453C252.266 133.859 254.656 135.797 256.312 138.266C257.969 140.703 258.797 143.453 258.797 146.516H246.422C246.422 145.172 246.109 143.953 245.484 142.859C244.891 141.766 243.969 140.891 242.719 140.234C241.469 139.547 239.891 139.203 237.984 139.203C236.266 139.203 234.812 139.484 233.625 140.047C232.469 140.609 231.594 141.344 231 142.25C230.406 143.156 230.109 144.156 230.109 145.25C230.109 146.062 230.266 146.797 230.578 147.453C230.922 148.078 231.469 148.656 232.219 149.188C232.969 149.719 233.984 150.203 235.266 150.641C236.578 151.078 238.188 151.5 240.094 151.906C243.875 152.656 247.172 153.656 249.984 154.906C252.828 156.125 255.047 157.75 256.641 159.781C258.234 161.812 259.031 164.406 259.031 167.562C259.031 169.812 258.547 171.875 257.578 173.75C256.609 175.594 255.203 177.203 253.359 178.578C251.516 179.953 249.312 181.031 246.75 181.812C244.188 182.562 241.297 182.938 238.078 182.938C233.422 182.938 229.484 182.109 226.266 180.453C223.047 178.766 220.609 176.641 218.953 174.078C217.297 171.484 216.469 168.797 216.469 166.016H228.328C228.422 167.984 228.953 169.562 229.922 170.75C230.891 171.938 232.109 172.797 233.578 173.328C235.078 173.828 236.656 174.078 238.312 174.078C240.188 174.078 241.766 173.828 243.047 173.328C244.328 172.797 245.297 172.094 245.953 171.219C246.609 170.312 246.938 169.281 246.938 168.125ZM310.078 168.922L323.672 113.75H331.031L331.5 125.375L316.969 182H309.188L310.078 168.922ZM301.5 113.75L312.656 168.734V182H304.172L288.703 113.75H301.5ZM345.609 168.5L356.578 113.75H369.422L353.953 182H345.469L345.609 168.5ZM334.547 113.75L348.141 169.109L348.938 182H341.156L326.672 125.328L327.234 113.75H334.547ZM402.984 171.219V147.828C402.984 146.109 402.688 144.625 402.094 143.375C401.5 142.125 400.594 141.156 399.375 140.469C398.156 139.781 396.609 139.438 394.734 139.438C393.078 139.438 391.625 139.719 390.375 140.281C389.156 140.844 388.219 141.641 387.562 142.672C386.906 143.672 386.578 144.828 386.578 146.141H374.156C374.156 144.047 374.656 142.062 375.656 140.188C376.656 138.281 378.078 136.594 379.922 135.125C381.797 133.625 384.031 132.453 386.625 131.609C389.25 130.766 392.188 130.344 395.438 130.344C399.281 130.344 402.703 131 405.703 132.312C408.734 133.594 411.109 135.531 412.828 138.125C414.578 140.719 415.453 143.984 415.453 147.922V170.047C415.453 172.578 415.609 174.75 415.922 176.562C416.266 178.344 416.766 179.891 417.422 181.203V182H404.812C404.219 180.719 403.766 179.094 403.453 177.125C403.141 175.125 402.984 173.156 402.984 171.219ZM404.719 151.109L404.812 158.469H396.984C395.047 158.469 393.344 158.672 391.875 159.078C390.406 159.453 389.203 160.016 388.266 160.766C387.328 161.484 386.625 162.359 386.156 163.391C385.688 164.391 385.453 165.531 385.453 166.812C385.453 168.062 385.734 169.188 386.297 170.188C386.891 171.188 387.734 171.984 388.828 172.578C389.953 173.141 391.266 173.422 392.766 173.422C394.953 173.422 396.859 172.984 398.484 172.109C400.109 171.203 401.375 170.109 402.281 168.828C403.188 167.547 403.672 166.328 403.734 165.172L407.297 170.516C406.859 171.797 406.203 173.156 405.328 174.594C404.453 176.031 403.328 177.375 401.953 178.625C400.578 179.875 398.922 180.906 396.984 181.719C395.047 182.531 392.797 182.938 390.234 182.938C386.953 182.938 384.016 182.281 381.422 180.969C378.828 179.656 376.781 177.859 375.281 175.578C373.781 173.297 373.031 170.703 373.031 167.797C373.031 165.109 373.531 162.734 374.531 160.672C375.531 158.609 377.016 156.875 378.984 155.469C380.953 154.031 383.391 152.953 386.297 152.234C389.234 151.484 392.594 151.109 396.375 151.109H404.719ZM439.734 131.281V182H427.312V131.281H439.734ZM426.469 118.016C426.469 116.172 427.094 114.641 428.344 113.422C429.625 112.203 431.344 111.594 433.5 111.594C435.656 111.594 437.359 112.203 438.609 113.422C439.891 114.641 440.531 116.172 440.531 118.016C440.531 119.828 439.891 121.344 438.609 122.562C437.359 123.781 435.656 124.391 433.5 124.391C431.344 124.391 429.625 123.781 428.344 122.562C427.094 121.344 426.469 119.828 426.469 118.016ZM475.547 131.281V140.188H446.484V131.281H475.547ZM454.266 118.812H466.688V167.375C466.688 168.875 466.891 170.031 467.297 170.844C467.703 171.656 468.312 172.203 469.125 172.484C469.938 172.766 470.906 172.906 472.031 172.906C472.844 172.906 473.594 172.859 474.281 172.766C474.969 172.672 475.547 172.578 476.016 172.484L476.062 181.766C475.031 182.109 473.859 182.391 472.547 182.609C471.266 182.828 469.812 182.938 468.188 182.938C465.406 182.938 462.969 182.469 460.875 181.531C458.781 180.562 457.156 179.016 456 176.891C454.844 174.734 454.266 171.891 454.266 168.359V118.812ZM496.922 131.281V182H484.5V131.281H496.922ZM483.656 118.016C483.656 116.172 484.281 114.641 485.531 113.422C486.812 112.203 488.531 111.594 490.688 111.594C492.844 111.594 494.547 112.203 495.797 113.422C497.078 114.641 497.719 116.172 497.719 118.016C497.719 119.828 497.078 121.344 495.797 122.562C494.547 123.781 492.844 124.391 490.688 124.391C488.531 124.391 486.812 123.781 485.531 122.562C484.281 121.344 483.656 119.828 483.656 118.016ZM520.875 142.109V182H508.5V131.281H520.125L520.875 142.109ZM518.906 154.812H515.25C515.281 151.125 515.781 147.781 516.75 144.781C517.719 141.781 519.078 139.203 520.828 137.047C522.609 134.891 524.719 133.234 527.156 132.078C529.594 130.922 532.312 130.344 535.312 130.344C537.75 130.344 539.953 130.688 541.922 131.375C543.891 132.062 545.578 133.156 546.984 134.656C548.422 136.156 549.516 138.125 550.266 140.562C551.047 142.969 551.438 145.938 551.438 149.469V182H538.969V149.375C538.969 147.062 538.625 145.234 537.938 143.891C537.281 142.547 536.312 141.594 535.031 141.031C533.781 140.469 532.234 140.188 530.391 140.188C528.484 140.188 526.812 140.578 525.375 141.359C523.969 142.109 522.781 143.156 521.812 144.5C520.875 145.844 520.156 147.391 519.656 149.141C519.156 150.891 518.906 152.781 518.906 154.812ZM594.609 131.281H605.859V180.453C605.859 185.047 604.859 188.938 602.859 192.125C600.891 195.344 598.125 197.781 594.562 199.438C591 201.125 586.859 201.969 582.141 201.969C580.109 201.969 577.906 201.688 575.531 201.125C573.188 200.562 570.922 199.672 568.734 198.453C566.578 197.266 564.781 195.719 563.344 193.812L568.922 186.5C570.609 188.469 572.516 189.953 574.641 190.953C576.766 191.984 579.062 192.5 581.531 192.5C584.031 192.5 586.156 192.031 587.906 191.094C589.688 190.188 591.047 188.844 591.984 187.062C592.953 185.312 593.438 183.156 593.438 180.594V142.859L594.609 131.281ZM560.344 157.25V156.266C560.344 152.391 560.812 148.875 561.75 145.719C562.688 142.531 564.031 139.797 565.781 137.516C567.562 135.234 569.703 133.469 572.203 132.219C574.734 130.969 577.578 130.344 580.734 130.344C584.078 130.344 586.891 130.953 589.172 132.172C591.484 133.391 593.391 135.125 594.891 137.375C596.422 139.625 597.609 142.297 598.453 145.391C599.328 148.453 600 151.828 600.469 155.516V158.188C600.031 161.781 599.328 165.078 598.359 168.078C597.422 171.078 596.172 173.703 594.609 175.953C593.047 178.172 591.109 179.891 588.797 181.109C586.484 182.328 583.766 182.938 580.641 182.938C577.516 182.938 574.703 182.297 572.203 181.016C569.703 179.734 567.562 177.938 565.781 175.625C564.031 173.312 562.688 170.594 561.75 167.469C560.812 164.344 560.344 160.938 560.344 157.25ZM572.719 156.266V157.25C572.719 159.438 572.938 161.484 573.375 163.391C573.812 165.297 574.484 166.984 575.391 168.453C576.297 169.891 577.438 171.016 578.812 171.828C580.188 172.641 581.828 173.047 583.734 173.047C586.297 173.047 588.391 172.516 590.016 171.453C591.672 170.359 592.922 168.875 593.766 167C594.641 165.094 595.203 162.953 595.453 160.578V153.219C595.297 151.344 594.953 149.609 594.422 148.016C593.922 146.422 593.219 145.047 592.312 143.891C591.406 142.734 590.25 141.828 588.844 141.172C587.438 140.516 585.766 140.188 583.828 140.188C581.953 140.188 580.312 140.609 578.906 141.453C577.5 142.266 576.344 143.406 575.438 144.875C574.531 146.344 573.844 148.047 573.375 149.984C572.938 151.922 572.719 154.016 572.719 156.266Z"
                                fill="#10B981"/>
                            <path
                                d="M24.5312 219.375V265H16.25V229.031L5.28125 232.656V225.969L23.5938 219.375H24.5312ZM69.9688 238.344V246C69.9688 249.5 69.6146 252.49 68.9062 254.969C68.1979 257.448 67.1771 259.479 65.8438 261.062C64.5104 262.625 62.9167 263.781 61.0625 264.531C59.2083 265.26 57.1458 265.625 54.875 265.625C53.0625 265.625 51.375 265.396 49.8125 264.938C48.25 264.458 46.8438 263.729 45.5938 262.75C44.3646 261.75 43.3021 260.479 42.4062 258.938C41.5312 257.396 40.8542 255.552 40.375 253.406C39.9167 251.26 39.6875 248.792 39.6875 246V238.344C39.6875 234.844 40.0417 231.865 40.75 229.406C41.4792 226.948 42.5104 224.938 43.8438 223.375C45.1771 221.812 46.7708 220.677 48.625 219.969C50.4792 219.24 52.5417 218.875 54.8125 218.875C56.6458 218.875 58.3333 219.104 59.875 219.562C61.4375 220.021 62.8333 220.74 64.0625 221.719C65.3125 222.677 66.375 223.927 67.25 225.469C68.125 226.99 68.7917 228.823 69.25 230.969C69.7292 233.094 69.9688 235.552 69.9688 238.344ZM61.7188 247.125V237.188C61.7188 235.438 61.6146 233.917 61.4062 232.625C61.2188 231.312 60.9375 230.198 60.5625 229.281C60.1875 228.365 59.7188 227.625 59.1562 227.062C58.5938 226.479 57.9479 226.052 57.2188 225.781C56.4896 225.51 55.6875 225.375 54.8125 225.375C53.7292 225.375 52.7604 225.594 51.9062 226.031C51.0521 226.448 50.3333 227.115 49.75 228.031C49.1667 228.948 48.7188 230.167 48.4062 231.688C48.1146 233.188 47.9688 235.021 47.9688 237.188V247.125C47.9688 248.875 48.0625 250.406 48.25 251.719C48.4583 253.031 48.75 254.156 49.125 255.094C49.5208 256.031 49.9896 256.802 50.5312 257.406C51.0938 257.99 51.7396 258.427 52.4688 258.719C53.1979 258.99 54 259.125 54.875 259.125C55.9792 259.125 56.9479 258.906 57.7812 258.469C58.6354 258.031 59.3542 257.344 59.9375 256.406C60.5208 255.448 60.9583 254.208 61.25 252.688C61.5625 251.146 61.7188 249.292 61.7188 247.125ZM106.531 238.344V246C106.531 249.5 106.177 252.49 105.469 254.969C104.76 257.448 103.74 259.479 102.406 261.062C101.073 262.625 99.4792 263.781 97.625 264.531C95.7708 265.26 93.7083 265.625 91.4375 265.625C89.625 265.625 87.9375 265.396 86.375 264.938C84.8125 264.458 83.4062 263.729 82.1562 262.75C80.9271 261.75 79.8646 260.479 78.9688 258.938C78.0938 257.396 77.4167 255.552 76.9375 253.406C76.4792 251.26 76.25 248.792 76.25 246V238.344C76.25 234.844 76.6042 231.865 77.3125 229.406C78.0417 226.948 79.0729 224.938 80.4062 223.375C81.7396 221.812 83.3333 220.677 85.1875 219.969C87.0417 219.24 89.1042 218.875 91.375 218.875C93.2083 218.875 94.8958 219.104 96.4375 219.562C98 220.021 99.3958 220.74 100.625 221.719C101.875 222.677 102.938 223.927 103.812 225.469C104.688 226.99 105.354 228.823 105.812 230.969C106.292 233.094 106.531 235.552 106.531 238.344ZM98.2812 247.125V237.188C98.2812 235.438 98.1771 233.917 97.9688 232.625C97.7812 231.312 97.5 230.198 97.125 229.281C96.75 228.365 96.2812 227.625 95.7188 227.062C95.1562 226.479 94.5104 226.052 93.7812 225.781C93.0521 225.51 92.25 225.375 91.375 225.375C90.2917 225.375 89.3229 225.594 88.4688 226.031C87.6146 226.448 86.8958 227.115 86.3125 228.031C85.7292 228.948 85.2812 230.167 84.9688 231.688C84.6771 233.188 84.5312 235.021 84.5312 237.188V247.125C84.5312 248.875 84.625 250.406 84.8125 251.719C85.0208 253.031 85.3125 254.156 85.6875 255.094C86.0833 256.031 86.5521 256.802 87.0938 257.406C87.6562 257.99 88.3021 258.427 89.0312 258.719C89.7604 258.99 90.5625 259.125 91.4375 259.125C92.5417 259.125 93.5104 258.906 94.3438 258.469C95.1979 258.031 95.9167 257.344 96.5 256.406C97.0833 255.448 97.5208 254.208 97.8125 252.688C98.125 251.146 98.2812 249.292 98.2812 247.125ZM143.094 238.344V246C143.094 249.5 142.74 252.49 142.031 254.969C141.323 257.448 140.302 259.479 138.969 261.062C137.635 262.625 136.042 263.781 134.188 264.531C132.333 265.26 130.271 265.625 128 265.625C126.188 265.625 124.5 265.396 122.938 264.938C121.375 264.458 119.969 263.729 118.719 262.75C117.49 261.75 116.427 260.479 115.531 258.938C114.656 257.396 113.979 255.552 113.5 253.406C113.042 251.26 112.812 248.792 112.812 246V238.344C112.812 234.844 113.167 231.865 113.875 229.406C114.604 226.948 115.635 224.938 116.969 223.375C118.302 221.812 119.896 220.677 121.75 219.969C123.604 219.24 125.667 218.875 127.938 218.875C129.771 218.875 131.458 219.104 133 219.562C134.562 220.021 135.958 220.74 137.188 221.719C138.438 222.677 139.5 223.927 140.375 225.469C141.25 226.99 141.917 228.823 142.375 230.969C142.854 233.094 143.094 235.552 143.094 238.344ZM134.844 247.125V237.188C134.844 235.438 134.74 233.917 134.531 232.625C134.344 231.312 134.062 230.198 133.688 229.281C133.312 228.365 132.844 227.625 132.281 227.062C131.719 226.479 131.073 226.052 130.344 225.781C129.615 225.51 128.812 225.375 127.938 225.375C126.854 225.375 125.885 225.594 125.031 226.031C124.177 226.448 123.458 227.115 122.875 228.031C122.292 228.948 121.844 230.167 121.531 231.688C121.24 233.188 121.094 235.021 121.094 237.188V247.125C121.094 248.875 121.188 250.406 121.375 251.719C121.583 253.031 121.875 254.156 122.25 255.094C122.646 256.031 123.115 256.802 123.656 257.406C124.219 257.99 124.865 258.427 125.594 258.719C126.323 258.99 127.125 259.125 128 259.125C129.104 259.125 130.073 258.906 130.906 258.469C131.76 258.031 132.479 257.344 133.062 256.406C133.646 255.448 134.083 254.208 134.375 252.688C134.688 251.146 134.844 249.292 134.844 247.125ZM179.344 239.844V247.188H148.156V239.844H179.344ZM167.719 227.312V260.438H159.812V227.312H167.719ZM220.281 251.188V219.5H228.875V251.188C228.875 254.208 228.219 256.802 226.906 258.969C225.594 261.115 223.802 262.76 221.531 263.906C219.26 265.052 216.698 265.625 213.844 265.625C210.906 265.625 208.302 265.135 206.031 264.156C203.76 263.156 201.979 261.635 200.688 259.594C199.417 257.552 198.781 254.958 198.781 251.812H207.406C207.406 253.521 207.667 254.896 208.188 255.938C208.708 256.979 209.448 257.729 210.406 258.188C211.385 258.646 212.531 258.875 213.844 258.875C215.115 258.875 216.229 258.583 217.188 258C218.167 257.396 218.927 256.521 219.469 255.375C220.01 254.229 220.281 252.833 220.281 251.188ZM235.312 248.438V247.781C235.312 245.302 235.667 243.021 236.375 240.938C237.083 238.833 238.115 237.01 239.469 235.469C240.823 233.927 242.479 232.729 244.438 231.875C246.396 231 248.625 230.562 251.125 230.562C253.667 230.562 255.917 231 257.875 231.875C259.854 232.729 261.521 233.927 262.875 235.469C264.229 237.01 265.26 238.833 265.969 240.938C266.677 243.021 267.031 245.302 267.031 247.781V248.438C267.031 250.896 266.677 253.177 265.969 255.281C265.26 257.365 264.229 259.188 262.875 260.75C261.521 262.292 259.865 263.49 257.906 264.344C255.948 265.198 253.708 265.625 251.188 265.625C248.688 265.625 246.448 265.198 244.469 264.344C242.49 263.49 240.823 262.292 239.469 260.75C238.115 259.188 237.083 257.365 236.375 255.281C235.667 253.177 235.312 250.896 235.312 248.438ZM243.562 247.781V248.438C243.562 249.917 243.708 251.302 244 252.594C244.292 253.885 244.74 255.021 245.344 256C245.948 256.979 246.729 257.75 247.688 258.312C248.667 258.854 249.833 259.125 251.188 259.125C252.521 259.125 253.667 258.854 254.625 258.312C255.583 257.75 256.365 256.979 256.969 256C257.594 255.021 258.052 253.885 258.344 252.594C258.635 251.302 258.781 249.917 258.781 248.438V247.781C258.781 246.323 258.635 244.958 258.344 243.688C258.052 242.396 257.594 241.26 256.969 240.281C256.365 239.281 255.573 238.5 254.594 237.938C253.635 237.354 252.479 237.062 251.125 237.062C249.792 237.062 248.646 237.354 247.688 237.938C246.729 238.5 245.948 239.281 245.344 240.281C244.74 241.26 244.292 242.396 244 243.688C243.708 244.958 243.562 246.323 243.562 247.781ZM273 217H281.281V257.531L280.469 265H273V217ZM303.031 247.75V248.406C303.031 250.927 302.75 253.24 302.188 255.344C301.646 257.448 300.823 259.271 299.719 260.812C298.615 262.333 297.24 263.521 295.594 264.375C293.969 265.208 292.062 265.625 289.875 265.625C287.792 265.625 285.979 265.219 284.438 264.406C282.917 263.594 281.635 262.448 280.594 260.969C279.552 259.469 278.719 257.708 278.094 255.688C277.469 253.646 277 251.417 276.688 249V247.219C277 244.781 277.469 242.552 278.094 240.531C278.719 238.51 279.552 236.75 280.594 235.25C281.635 233.75 282.917 232.594 284.438 231.781C285.958 230.969 287.75 230.562 289.812 230.562C292.021 230.562 293.948 230.99 295.594 231.844C297.26 232.677 298.635 233.865 299.719 235.406C300.823 236.927 301.646 238.74 302.188 240.844C302.75 242.927 303.031 245.229 303.031 247.75ZM294.75 248.406V247.75C294.75 246.312 294.635 244.958 294.406 243.688C294.177 242.396 293.802 241.26 293.281 240.281C292.76 239.302 292.052 238.531 291.156 237.969C290.26 237.406 289.135 237.125 287.781 237.125C286.49 237.125 285.385 237.344 284.469 237.781C283.573 238.219 282.823 238.823 282.219 239.594C281.635 240.365 281.177 241.271 280.844 242.312C280.531 243.354 280.323 244.479 280.219 245.688V250.562C280.365 252.167 280.708 253.615 281.25 254.906C281.792 256.177 282.594 257.188 283.656 257.938C284.74 258.688 286.135 259.062 287.844 259.062C289.177 259.062 290.292 258.802 291.188 258.281C292.083 257.74 292.792 256.99 293.312 256.031C293.833 255.052 294.198 253.917 294.406 252.625C294.635 251.333 294.75 249.927 294.75 248.406ZM327.625 255.75C327.625 255.042 327.438 254.406 327.062 253.844C326.688 253.281 325.979 252.771 324.938 252.312C323.917 251.833 322.417 251.385 320.438 250.969C318.688 250.594 317.073 250.125 315.594 249.562C314.115 249 312.844 248.323 311.781 247.531C310.719 246.719 309.885 245.771 309.281 244.688C308.698 243.583 308.406 242.312 308.406 240.875C308.406 239.479 308.708 238.167 309.312 236.938C309.917 235.688 310.792 234.594 311.938 233.656C313.083 232.698 314.479 231.948 316.125 231.406C317.771 230.844 319.625 230.562 321.688 230.562C324.562 230.562 327.031 231.031 329.094 231.969C331.177 232.906 332.771 234.198 333.875 235.844C334.979 237.469 335.531 239.302 335.531 241.344H327.281C327.281 240.448 327.073 239.635 326.656 238.906C326.26 238.177 325.646 237.594 324.812 237.156C323.979 236.698 322.927 236.469 321.656 236.469C320.51 236.469 319.542 236.656 318.75 237.031C317.979 237.406 317.396 237.896 317 238.5C316.604 239.104 316.406 239.771 316.406 240.5C316.406 241.042 316.51 241.531 316.719 241.969C316.948 242.385 317.312 242.771 317.812 243.125C318.312 243.479 318.99 243.802 319.844 244.094C320.719 244.385 321.792 244.667 323.062 244.938C325.583 245.438 327.781 246.104 329.656 246.938C331.552 247.75 333.031 248.833 334.094 250.188C335.156 251.542 335.688 253.271 335.688 255.375C335.688 256.875 335.365 258.25 334.719 259.5C334.073 260.729 333.135 261.802 331.906 262.719C330.677 263.635 329.208 264.354 327.5 264.875C325.792 265.375 323.865 265.625 321.719 265.625C318.615 265.625 315.99 265.073 313.844 263.969C311.698 262.844 310.073 261.427 308.969 259.719C307.865 257.99 307.312 256.198 307.312 254.344H315.219C315.281 255.656 315.635 256.708 316.281 257.5C316.927 258.292 317.74 258.865 318.719 259.219C319.719 259.552 320.771 259.719 321.875 259.719C323.125 259.719 324.177 259.552 325.031 259.219C325.885 258.865 326.531 258.396 326.969 257.812C327.406 257.208 327.625 256.521 327.625 255.75Z"
                                fill="#333333"/>
                        </svg>
                    </div>
                    <div className="row">
                        <button className="btn btn-success text-light mt-5" style={{width: '200px', height: '50px', marginLeft:'90px', marginTop:'50px'}}>Apply Now</button>
                    </div>
                </div>
                <div className="col-lg-5 col-md-11">
                    <img src={HomeImg} alt="Image" style={{width: '500px', marginLeft: '100px'}} className="img-fluid mt-5"/>
                </div>
            </div>
        </div>
    );
}