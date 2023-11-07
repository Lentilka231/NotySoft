import styles from "../styles/svg.module.scss"

function HelpLines({tone}){
    let iterator = [];
    
    if (tone<1){
        for(let i = 0; i>=tone; i-=2){
            iterator[-i/2]=-i/2
        }
        return(
            <>
                {iterator.map((i)=>(
                    <line 
                    style={{"stroke":"black","stroke-width":"10"}}
                    x1="30" y1={255-i*72+(tone%2==0?0:-37)+"px"}
                    x2="180" y2={255-i*72+(tone%2==0?0:-37)+"px"}
                    />
                ))}
            </>
        )
    } else if(tone>11){
        for(let i = 0; i<=(tone-12); i+=2){
            iterator[i/2]=i/2
        }
        return(
            <>
                {iterator.map((i)=>(
                    <line 
                    style={{"stroke":"black","stroke-width":"10"}}
                    x1="30" y1={255+i*72+(tone%2==0?0:37)+"px"}
                    x2="180" y2={255+i*72+(tone%2==0?0:37)+"px"}
                    />
                ))}
            </>
        )
    }else{
        return
    }
}
export function Note({className,colour="#000000", width,height,type="1",tone=1}){
    switch (colour){
        case "orange":
            colour="#f7a800"
            break;
        case "white":
            colour="#ffffff";
            break;
    }
    let d=""
    switch (type){
        case "whole":
            d="m 85.908984,293.74354 c -12.540951,-2.39444 -19.580088,-5.05245 -27.522153,-10.39259 -9.889032,-6.64934 -13.191294,-12.50441 -13.79499,-24.4593 -0.719294,-14.24418 5.219001,-22.63095 21.352802,-30.15694 7.50086,-3.49891 12.119707,-4.68671 25.052002,-6.44238 22.704225,-3.08236 50.446645,3.21943 62.384435,14.17075 3.52357,3.53457 6.9678,7.16998 8.56006,10.93417 0.75205,1.778 1.39175,6.35755 1.45584,10.7111 0.20963,14.23823 -6.4409,23.10557 -22.80649,30.40823 -14.36192,6.40856 -37.10589,8.58263 -54.681506,5.22696 z m 31.199286,-5.83105 c 4.95832,-2.02364 7.82934,-6.24987 9.18015,-13.5134 2.57777,-13.86119 -2.39443,-30.35103 -11.7529,-38.97737 -6.75076,-6.2226 -9.19837,-7.33756 -15.789412,-7.19224 -7.128077,0.15721 -10.519442,1.61895 -14.065665,6.06316 -2.487785,3.11776 -2.836326,4.73956 -3.166527,14.73364 -0.486866,14.73633 1.983512,21.84299 10.809225,31.09588 8.142099,8.53609 16.511969,11.16689 24.785129,7.79033 z"
            break;
        case "half":
            d="m 89.766781,293.0193 c -6.597706,-1.84598 -14.191989,-9.22152 -16.13803,-15.67321 -3.628537,-12.02964 -2.65217,-28.90082 3.703157,-37.30575 8.178187,-10.81569 8.32818,-10.81439 21.066536,-19.08487 2.655256,-1.72394 8.260486,-4.38038 12.735266,-5.59495 4.44769,-1.20724 9.12438,-1.54834 13.73266,-1.60204 5.92311,-0.069 12.73962,-0.0279 17.69401,1.64738 l 6.07408,2.05262 V 110.93019 4.4019372 h 4.7536 4.75363 l -0.024,123.8580528 c 0,0 0.0535,114.83625 -0.0241,123.85801 -0.41935,2.12097 -2.4672,5.99848 -2.4672,5.99848 -2.74815,10.35567 -17.63912,27.02695 -43.4343,34.72687 -4.23618,1.26451 -16.781708,1.7544 -22.423283,0.17607 z m 6.049731,-16.49911 c 15.723288,-4.81512 30.680018,-15.12252 42.844638,-29.52629 6.41656,-7.59763 7.77522,-9.94164 7.82317,-13.49688 0.10782,-7.99394 -10.85051,-6.99149 -26.89973,2.46075 -11.82369,6.96363 -19.638357,12.86771 -26.526842,20.04135 -9.597976,9.9953 -11.982918,15.85387 -8.169288,20.06788 2.083785,2.30253 4.554606,2.40501 10.928052,0.45319 z"
            break;
        case "quarter":
            d="m 86.056251,293.42424 c -13.745344,-4.5153 -20.734273,-16.33887 -17.70862,-29.9587 1.871489,-8.42441 4.21978,-12.66425 11.380663,-20.54783 8.819424,-9.70945 24.353066,-19.16784 33.881186,-20.63012 13.92258,-2.13671 20.37497,-1.54529 29.09247,2.66656 l 4.31737,2.08593 V 114.629 2.2178936 h 4.39149 4.39152 L 155.50715,128.65534 c -0.24399,104.47089 -0.55611,127.0068 -1.79668,129.71443 -0.82579,1.80238 -2.03974,4.50589 -2.69765,6.00783 -3.28145,7.49124 -15.1364,19.20364 -23.10923,22.83143 -12.09907,5.50528 -16.76609,6.77082 -26.76213,7.25704 -7.221906,0.35133 -11.808667,0.033 -15.085127,-1.04183 z"
            break;
    }
    console.log("tone: "+tone+ " "+(27-(5*tone))+"px")
    if(className=="noteInToolBar"){
        return(
                <svg
                className={styles[className]}
                height={height}
                width={width}
                viewBox="0 0 210 297">
                    <path
                    style={{"fill":colour}}
                    d={d}/>            
                </svg>
            )   
    }else{
        return(
        <div 
        style={{"top":55.5-(5*tone)+"px"}}
        className={styles[className]}>
            <svg
            
            height={height}
            width={width}
            viewBox="0 0 210 700">
                <path
                
                style={{"fill":colour}}
                d={d}/>            
                <HelpLines tone={tone}/>
            </svg>
        </div>
        )   
    }
}
export function Clef({className,colour="#000000", width, height, type="treble"}){
    let d ="";
    switch (type){
        case "treble":
            d="M 86.24331,294.95005 C 71.151544,291.15197 62.766269,273.19496 69.6812,259.48222 c 4.044524,-8.02051 15.582258,-12.0665 23.162492,-8.12249 6.093519,3.17043 10.963768,10.87867 10.963768,17.3525 0,8.2355 -5.151412,14.34486 -14.985863,17.77258 -4.836976,1.6859 -4.859719,1.71673 -2.284824,3.09478 1.430414,0.76551 5.553835,1.62895 9.163069,1.91867 12.028998,0.96555 26.507868,-6.81495 31.816778,-17.09737 3.44551,-6.67339 3.52706,-11.19279 0.44297,-24.55131 -1.56956,-6.79837 -3.10384,-13.93264 -3.40949,-15.85392 -0.62468,-3.92609 -1.61951,-4.18812 -7.1413,-1.88096 -5.35643,2.23802 -17.03988,2.01937 -26.9044,-0.50357 -16.717131,-4.27552 -34.592859,-16.35619 -41.242883,-27.87248 -1.570198,-2.71925 -2.90758,-3.50893 -3.771693,-5.58145 -2.653003,-6.36306 -4.023235,-14.59725 -4.023235,-20.28684 0,-7.48529 4.199868,-22.12817 8.689387,-30.29569 7.534286,-13.70674 19.112933,-27.42238 36.366995,-43.07902 l 9.049108,-8.211367 -1.94873,-10.352777 C 92.103729,77.858182 91.820413,72.814063 92.336708,63.022507 93.58447,39.35843 100.65195,19.147229 111.86511,7.1761954 c 6.75256,-7.20896834 5.76798,-7.74329615 14.40943,7.8202376 17.07146,30.746382 16.92018,57.812959 -0.46819,83.769933 -2.00507,2.993094 -7.58658,9.491224 -12.40331,14.440294 l -8.75777,8.99823 3.56176,15.99188 3.5617,15.99183 8.11137,0.003 c 7.39009,0.002 8.68473,0.3457 14.56039,3.85842 13.2964,7.94945 19.63031,17.4454 20.65055,30.95958 0.51673,6.84481 0.24781,8.3596 -2.59531,14.62795 -3.79996,8.37736 -13.29525,19.0266 -20.206,22.66165 -4.01286,2.11074 -4.79728,2.98976 -4.23058,4.7409 0.38268,1.18231 1.93229,9.27814 3.4437,17.99077 2.44345,14.08539 2.60047,16.50045 1.41668,21.79034 -2.23302,9.9781 -12.03092,20.06024 -22.47241,23.1243 -5.64597,1.65681 -19.352042,2.22579 -24.20381,1.0048 z m 32.20824,-68.29387 4.43304,-2.0654 -3.10952,-12.89812 c -1.71027,-7.09396 -3.78973,-16.76754 -4.62105,-21.49683 -1.94736,-11.07792 -3.47474,-17.74528 -4.24066,-18.51122 -0.7606,-0.7606 -8.67065,2.23294 -13.16172,4.98104 -1.852817,1.1337 -4.754913,3.88043 -6.449058,6.10388 -2.592089,3.40181 -3.047734,4.9454 -2.874716,9.73834 0.256744,7.11485 2.708355,12.39352 7.727165,16.63802 3.417046,2.88988 3.563493,3.19756 1.203373,2.52816 -6.166529,-1.7489 -13.147919,-6.48882 -16.184476,-10.98818 -2.601926,-3.85528 -3.162696,-5.79614 -3.162696,-10.94624 0,-13.28839 4.066657,-19.51048 20.959449,-32.06837 0.591154,-0.43947 2.525879,-1.30301 4.299349,-1.91901 3.09336,-1.07441 3.21061,-1.34638 2.88195,-6.6854 -0.18849,-3.06096 -1.39761,-9.94141 -2.68711,-15.28988 l -2.34448,-9.72444 -9.166284,7.38763 c -15.966642,12.86849 -27.676099,27.1427 -33.202056,40.47435 -2.165949,5.22547 -2.681304,8.30427 -2.700317,16.13162 -0.02031,9.23323 0.159653,9.99163 3.998782,16.66005 6.724162,11.67952 16.75861,19.18221 30.858822,23.07289 7.929492,2.18797 21.635233,1.62919 27.542213,-1.12289 z m 13.65513,-8.27377 c 6.77081,-6.77079 9.66555,-13.47063 9.60388,-22.22789 -0.0531,-7.55679 -3.15677,-15.73221 -7.44195,-19.60383 -4.90136,-4.42839 -17.44261,-7.96815 -19.04497,-5.37549 -0.29371,0.47518 0.69776,5.67472 2.20324,11.55455 1.50544,5.87983 3.13889,12.86716 3.62983,15.52739 2.59486,14.05968 4.21015,23.19689 4.22779,23.91525 0.0464,1.88434 2.52474,0.50748 6.82218,-3.78998 z M 126.15003,60.778235 c 4.61184,-9.203809 5.06594,-10.793547 5.06594,-17.734925 0,-6.549845 -0.47157,-8.458319 -3.3447,-13.536479 -3.99436,-7.060001 -7.3434,-8.076942 -13.34998,-4.053826 -10.51731,7.04432 -18.99706,39.661719 -16.421582,63.165695 l 0.647252,5.90717 11.16856,-11.81877 c 9.13319,-9.664973 12.09177,-13.661276 16.23451,-21.928865 z"
            break;
        case "bass":
            d="m 52.121155,197.11894 c -0.960564,-1.06143 -1.568752,-2.09849 -1.351553,-2.30464 0.217055,-0.20614 3.641529,-1.6314 7.60962,-3.16728 17.067361,-6.60608 33.144158,-21.71588 43.812428,-41.17716 2.21491,-4.0549 4.58101,-9.23205 6.22654,-12.04873 2.07484,-4.11153 5.72365,-17.03486 6.4172,-27.6364 0.59721,-9.12834 -0.93235,-18.036586 -4.22,-24.577657 -2.06431,-4.107072 -8.31631,-10.12307 -12.21168,-11.750649 -9.347286,-3.905556 -22.212528,-2.304809 -29.688533,3.693955 -3.612623,2.898782 -9.374119,12.412865 -9.374119,15.479759 0,2.411001 1.767664,2.660659 4.548684,0.642434 3.080058,-2.235208 10.290364,-2.88589 13.413435,-1.210522 4.451899,2.388283 6.08682,5.789898 6.08682,12.66422 0,5.11748 -0.450249,7.12331 -2.164394,9.6419 -3.280936,4.82068 -6.551253,6.77125 -12.321548,7.34919 -4.745559,0.4753 -5.612612,0.24795 -9.287989,-2.43646 -4.821546,-3.5214 -6.757909,-6.96088 -8.386504,-14.89664 -3.984308,-19.414489 12.492498,-37.286031 35.766302,-38.793884 11.284051,-0.731039 17.359486,0.592953 28.933926,6.305476 4.84515,2.391304 12.38957,10.909453 15.51424,17.516555 3.66048,7.740024 5.26169,17.558683 4.49342,27.553653 -0.48156,6.26502 -1.44692,9.90645 -4.59456,17.33175 -2.19171,5.17014 -4.47627,10.04962 -5.07681,10.84322 -0.60056,0.7936 -2.11463,3.39092 -3.36464,5.77174 -2.96229,5.64221 -6.11383,9.88549 -12.0605,16.23852 -4.88924,5.22333 -19.129862,15.63359 -20.516077,16.46808 -0.557173,0.33541 -2.595119,1.46362 -5.037006,3.01531 -4.034587,2.92267 -14.740077,7.17746 -15.615859,7.50899 -0.875783,0.33151 -2.787201,0.87505 -5.912234,1.95021 -7.126574,2.45191 -9.437928,2.45689 -11.638718,0.0255 z M 152.65113,133.63558 c -2.59633,-2.59633 -2.69834,-10.54446 -0.1647,-12.83735 2.58414,-2.33862 9.03399,-2.09171 11.31863,0.43332 2.6819,2.96403 2.3736,10.21196 -0.53453,12.56684 -2.90806,2.3548 -8.18261,2.27395 -10.61937,-0.16288 z m -0.33194,-40.237472 c -2.50955,-2.772972 -2.09482,-9.368949 0.76914,-12.232894 5.17465,-5.174686 13.03016,-0.790484 13.03016,7.272188 0,0.90784 -0.8972,2.79122 -1.99375,4.185272 -1.59805,2.031569 -2.80941,2.534617 -6.10364,2.534617 -2.75994,0 -4.63282,-0.577836 -5.70191,-1.759183 z"

            break;
        case "alto":
       d="M 48.023448,149.00714 V 65.915087 h 10.386507 10.386509 v 83.092053 83.09208 H 58.409955 48.023448 Z m 30.664921,0 V 65.915087 h 2.967574 2.967574 v 40.062243 c 0,39.72635 0.01752,40.06225 2.027507,40.06225 3.763293,0 7.451636,-2.78671 10.043835,-7.58846 3.038925,-5.62928 5.734101,-14.31411 5.734101,-18.47724 0,-2.91395 0.10048,-2.85833 7.17165,3.98928 10.42213,10.09197 15.14532,12.01622 21.46852,8.74629 8.2182,-4.24971 12.3733,-24.81102 8.62624,-42.686564 -2.35972,-11.257035 -6.27823,-14.342027 -18.96637,-14.931453 -13.06328,-0.606366 -16.76308,3.050877 -7.91801,7.827852 8.4275,4.551604 10.26961,8.953777 6.80334,16.258449 -2.5119,5.293386 -5.74925,7.294156 -11.80231,7.294156 -4.15485,0 -5.84393,-0.51523 -8.208705,-2.50527 -5.554749,-4.674038 -6.537938,-14.566575 -2.275825,-22.89868 3.12623,-6.111567 10.20624,-12.066108 15.69668,-13.201381 2.6055,-0.538604 5.96753,-1.251404 7.4712,-1.583446 7.82476,-1.72832 27.56736,7.063059 33.52943,14.930635 8.71699,11.50297 8.91564,29.997852 0.47692,44.397482 -3.67163,6.26519 -11.51074,12.96852 -16.94511,14.49006 -5.94623,1.66487 -17.2813,0.71968 -22.5339,-1.87928 -4.76827,-2.35911 -6.93005,-1.59957 -8.53287,2.99829 -2.24722,6.44642 -0.62296,18.97496 2.86979,22.13577 1.66212,1.50423 2.0799,1.38285 6.2841,-1.82634 5.89766,-4.50183 10.59022,-5.97043 16.97176,-5.31185 19.64321,2.02742 33.29188,26.86531 28.0904,51.11893 -3.14713,14.67465 -18.62507,24.81744 -37.80663,24.77515 -9.96086,-0.0235 -21.69031,-7.07522 -25.519206,-15.34516 -6.088667,-13.15091 4.476466,-27.46923 15.910356,-21.56223 4.42607,2.28655 7.93324,7.55422 7.93324,11.91551 0,3.52884 -2.73702,6.95464 -9.41257,11.78126 l -2.95231,2.13466 2.25566,2.31671 c 2.01203,2.06655 3.15283,2.31682 10.56215,2.31682 9.52451,0 12.61054,-1.51173 15.67928,-7.68065 4.35813,-8.7609 4.76464,-30.98673 0.75848,-41.47196 -2.58016,-6.7531 -7.65147,-11.68267 -12.0186,-11.68267 -6.0911,0 -14.5875,6.2936 -20.55441,15.22553 l -2.57187,3.84989 -1.2508,-6.17991 c -1.62171,-8.01256 -5.878742,-17.43414 -8.979402,-19.87315 -1.346051,-1.05852 -3.722762,-1.92508 -5.281556,-1.92508 h -2.834174 v 38.08379 38.0839 h -2.967573 -2.967573 z"
            break
    }
    return(
        <svg
        width={width}
        height={height}
        viewBox="0 0 210 297"
        className={styles[className]}>
        <path
            style={{"fill":colour}}
            d = {d}
            />
        </svg>
    )
}

export function Time({className,colour="#000000", width, height, type="44"}){
    let d="";
    switch(type){
        case "24":
            d="m 96.102896,291.87767 c -3.64494,-1.20866 -2.046336,-4.14725 3.940294,-7.24299 5.65462,-2.92412 5.92608,-3.64779 5.92608,-15.79626 v -12.7318 L 79.82016,255.55563 C 50.766318,254.94343 48.560861,253.74575 56.236862,242.75046 75.743347,214.80885 81.52045,202.89459 87.799591,177.65782 l 5.32985,-21.42131 20.569819,-0.56666 c 11.31341,-0.31133 21.39607,0.2598 22.40584,1.26942 1.13101,1.13102 0.96101,3.47076 -0.44273,6.09377 -2.58231,4.82508 -30.10865,38.10235 -47.48224,57.40251 -17.4146,19.34563 -21.712956,24.54006 -21.715606,26.24258 -0.0013,0.85283 9.000343,1.29728 20.00367,0.98766 l 20.006136,-0.56293 0.44572,-12.83982 c 0.79221,-22.83184 -1.60569,-17.96025 21.41758,-43.51096 12.12488,-13.45592 13.53079,-11.73151 12.92769,15.8559 -0.24936,11.40772 -0.29267,25.35937 -0.0962,31.00376 l 0.35686,10.26236 9.36526,0.60175 c 6.92651,0.44572 9.5304,1.47273 9.99979,3.94575 0.51291,2.70311 -1.18626,3.45986 -8.87131,3.95073 l -9.50599,0.60698 -0.58608,11.15791 c -0.55247,10.50948 -0.23143,11.41084 5.52905,15.51246 10.38182,7.39247 6.95861,8.74246 -22.35829,8.81719 -14.85495,0.0373 -27.902698,-0.2277 -28.994888,-0.5898 z M 111.89534,141.49638 c -2.7161,-0.83611 -10.38181,-4.30635 -17.034924,-7.71155 -6.653035,-3.40521 -14.030714,-6.19127 -16.394776,-6.19127 -5.838525,0 -15.079737,4.9974 -18.639527,10.07967 -4.568788,6.52283 -7.8625,2.74993 -6.469777,-7.41112 2.093266,-15.27201 11.952372,-29.24702 28.721206,-40.711621 4.992106,-3.412973 11.620042,-8.93906 14.966663,-11.675016 9.268755,-7.495392 20.935505,-12.957431 24.551695,-24.589446 2.85556,-10.284536 2.6999,-14.830015 -0.77863,-22.737699 -4.28372,-9.73818 -7.50094,-13.182734 -15.39189,-16.479836 -6.228829,-2.602547 -7.868421,-2.606056 -14.033409,-0.02986 -3.839277,1.604204 -8.828673,4.900485 -11.087518,7.325044 l -4.107,4.40833 8.84109,8.117551 C 89.901101,38.35418 94.478236,44.392024 95.209822,47.30702 97.00672,54.46632 93.188421,62.912371 86.32104,66.969057 75.629932,73.284404 65.348285,70.111012 58.810068,58.477832 50.952324,44.496842 54.447818,31.868079 69.725541,19.041694 81.208277,9.4013181 90.890186,6.2426348 108.93234,6.2506984 c 13.52168,0.00591 17.51371,0.8517125 27.65499,5.8588836 18.07142,8.922603 25.59587,24.367586 20.71032,42.511055 -3.39565,12.610544 -12.69588,18.929779 -43.42689,29.507275 -7.06195,2.43068 -17.222553,6.760324 -22.57913,9.62134 l -9.739256,5.201963 15.728644,1.181625 c 8.650692,0.64954 17.837512,2.31026 20.415132,3.68974 2.57753,1.37947 9.11424,2.57492 14.52592,2.65652 8.38244,0.12617 10.53151,-0.65625 14.51354,-5.28558 5.77862,-6.718058 8.69063,-5.339326 6.71514,3.17944 -4.13813,17.84528 -15.27326,33.5677 -25.49643,36.00017 -2.85698,0.6794 -6.52782,1.55277 -8.15749,1.93995 -1.62973,0.38748 -5.18539,0.0224 -7.90149,-0.81632 z"
             break;
        case "34":
            d="m 104.94627,290.60202 c -6.354136,-0.90245 -5.397546,-6.75656 1.5313,-9.37194 5.75886,-2.17371 5.83283,-2.37474 5.26724,-14.30638 l -0.57334,-12.10162 -25.835449,-0.95774 C 55.439456,252.75617 54.366034,251.94219 64.115046,237.77248 78.644178,214.785 90.746524,189.49864 95.66411,165.75735 l 2.099793,-10.53455 22.505557,-0.53931 c 17.3134,-0.4148 22.50101,0.029 22.48552,1.91535 -0.0361,4.6183 -16.00998,24.45094 -54.089074,67.16269 -9.217743,10.33909 -16.759528,19.64826 -16.759528,20.68701 0,1.15393 7.637271,1.67631 19.632546,1.34279 l 19.632546,-0.54582 0.95767,-16.40402 c 1.05758,-18.11397 1.1826,-18.3436 21.73879,-39.91857 l 9.86485,-10.3538 1.0727,33.33823 c 0.58999,18.33601 1.23646,33.5064 1.43655,33.71205 0.1998,0.20561 4.45014,0.63633 9.4446,0.95767 6.84228,0.44016 9.23765,1.41006 9.71725,3.93567 0.53787,2.83066 -0.85452,3.35189 -8.9517,3.35189 -11.20315,0 -12.94881,2.64607 -10.87392,16.48234 1.02254,6.81889 2.37164,9.01417 7.01507,11.41541 10.49118,5.42519 5.77413,7.47483 -19.54872,8.49433 -13.08368,0.52701 -25.7278,0.68193 -28.09805,0.34531 z M 84.561062,139.39192 C 60.197341,131.05287 49.186167,104.10186 65.163784,91.915119 c 7.57575,-5.778253 16.684894,-6.052251 24.163848,-0.726743 4.699832,3.346541 5.562962,5.270998 5.562962,12.403564 0,5.06598 -1.529284,10.95065 -3.82359,14.71374 -5.226773,8.57264 -4.897535,13.79268 1.040622,16.49833 6.431381,2.93034 9.509054,2.80483 16.211164,-0.66094 7.3965,-3.82482 15.17573,-17.47968 16.52295,-29.00245 C 126.64329,89.732575 118.43368,82.312111 96.829112,79.820379 89.08636,78.92735 86.153834,77.75308 85.695654,75.362269 85.235975,72.961973 87.222622,71.537879 93.323235,69.895157 114.76341,64.121902 122.88253,54.209342 120.48685,36.731188 118.92161,25.311215 113.10433,18.509695 102.9549,16.232905 87.485546,12.762581 82.81946,19.963471 92.89736,31.753802 c 11.41345,13.352837 4.729209,30.573575 -11.867136,30.573575 -6.132684,0 -8.889379,-1.297557 -14.343159,-6.751337 -6.369482,-6.369482 -6.697278,-7.314852 -5.794325,-16.711603 0.847932,-8.824946 1.928304,-10.838812 9.478715,-17.669577 9.442287,-8.542248 26.79963,-14.4132307 42.612205,-14.4132307 23.58832,0 44.11643,19.7322257 40.51269,38.9420007 -1.36531,7.277637 -10.31209,17.730019 -17.52268,20.471502 -7.44464,2.830455 0.15853,3.387296 3.92805,5.709127 3.76953,2.321815 9.78537,7.812898 13.51839,13.419719 3.36384,5.052443 4.67769,9.301281 4.67769,17.598412 0,14.74052 -6.84589,23.91546 -24.23016,32.47371 -15.70065,7.72944 -34.052947,9.21673 -49.306578,3.99582 z"
             break;
        case "44":
            d="m 97.625306,288.55522 c -6.279046,-0.89178 -5.333824,-6.67686 1.513225,-9.26136 5.690869,-2.14805 5.764049,-2.34665 5.205129,-14.13743 l -0.56657,-11.95882 -25.530465,-0.94637 C 48.702989,251.15608 47.642233,250.35171 57.276168,236.34927 72.162445,214.87648 83.620654,188.5131 88.45279,165.18435 l 2.075008,-10.41018 22.239882,-0.53296 c 17.10903,-0.40991 22.23532,0.0286 22.22,1.89281 -0.0357,4.56379 -15.82091,24.16224 -53.45048,66.36977 -9.108923,10.21704 -16.561682,19.41631 -16.561682,20.44288 0,1.1403 7.547046,1.65651 19.400782,1.32687 l 19.40079,-0.5394 0.94637,-16.21036 c 1.04501,-17.90014 1.16856,-18.127 21.48217,-39.44733 l 9.74839,-10.23149 1.06004,32.94459 c 0.58303,18.11955 1.22185,33.11085 1.41957,33.31408 0.19745,0.20317 4.39762,0.62882 9.33306,0.94637 6.76157,0.43494 9.12867,1.39348 9.60261,3.88927 0.53151,2.79725 -0.84444,3.31233 -8.84603,3.31233 -11.07091,0 -12.79595,2.61476 -10.74556,16.28769 1.01047,6.73846 2.34357,8.90776 6.93226,11.28065 10.36734,5.36115 5.70596,7.38667 -19.31801,8.39405 -12.92917,0.52079 -25.424014,0.67388 -27.76637,0.34195 z m 0,-147.63519 c -6.279046,-0.89178 -5.333824,-6.67687 1.513225,-9.26137 5.690869,-2.14804 5.764049,-2.34664 5.205129,-14.13743 l -0.56657,-11.95882 -25.530465,-0.94637 C 48.702989,103.52088 47.642233,102.71652 57.276168,88.714082 71.045175,66.314742 83.454047,40.822051 88.45279,17.549166 L 90.527798,7.1389789 112.76768,6.6060247 c 17.10903,-0.4106242 22.23532,0.028614 22.22,1.8927359 C 134.95199,13.062558 119.16677,32.660999 81.5372,74.86854 72.428277,85.085567 64.975518,94.284917 64.975518,95.311404 c 0,1.140304 7.547046,1.656523 19.400782,1.326942 l 19.40079,-0.539393 0.94637,-16.210353 c 1.04501,-17.900151 1.16856,-18.126994 21.48217,-39.447341 l 9.74839,-10.231486 1.06004,32.944592 c 0.58303,18.119553 1.22185,33.110921 1.41957,33.314085 0.19745,0.203165 4.39762,0.628809 9.33306,0.946439 6.76157,0.434942 9.12867,1.393395 9.60261,3.889201 0.53151,2.79724 -0.84444,3.31232 -8.84603,3.31232 -11.07091,0 -12.79595,2.61476 -10.74556,16.28769 1.01047,6.73845 2.34357,8.90776 6.93226,11.28065 10.36734,5.36114 5.70596,7.38666 -19.31801,8.39404 -12.92917,0.5208 -25.424014,0.6746 -27.76637,0.34196 z"
            break;
        case "64":
            d="m 96.756154,285.85038 c 0,-3.48713 1.232026,-4.99284 4.460296,-5.45137 4.10298,-0.5829 4.46021,-1.66545 4.46021,-13.51859 V 253.99533 L 82.178019,253.4349 c -16.853232,-0.40158 -25.035756,-0.43142 -26.265829,-3.32747 -1.230073,-2.89605 0.789156,-5.84626 2.649411,-10.47537 0.730496,-1.90318 4.712706,-7.92449 8.849704,-13.38072 12.632233,-21.45414 20.111524,-44.4649 26.103624,-66.91229 l 1.334146,-5.45137 H 115.6257 c 16.09285,0 19.82908,0.0413 19.82908,0.0413 -11.59615,21.29486 -31.77521,47.83038 -49.947651,66.43777 -12.385001,12.61696 -18.019927,22.26827 -13.920089,23.84157 1.497403,0.57464 9.780018,0.7815 18.405853,0.46001 l 15.683397,-0.5844 1.98237,-17.24957 c 1.58237,-13.76963 -0.36715,0.36715 1.91432,-14.9009 3.38316,-4.28727 27.33594,-27.59025 32.26741,-31.93926 0,0 0.51938,13.34222 0.30702,26.42557 -0.41236,25.40528 -0.3724,33.79087 -0.0373,37.6368 2.70656,0.82746 4.68978,1.01852 8.1686,1.01852 6.52545,0 7.92928,0.68105 7.92928,3.84503 0,3.01219 -1.61009,3.97824 -7.43373,4.46022 l -7.43368,0.61511 -0.59414,12.54931 c -0.5327,11.24505 -0.17232,12.65974 3.46906,13.61193 2.66247,0.69603 4.06336,2.69144 4.06336,5.78717 v 4.72461 H 123.51744 96.756004 Z M 61.733822,108.78991 c -1.392066,-7.4699 -3.632995,-14.888543 -3.632995,-33.268165 0,-16.113094 1.933701,-26.084178 4.807733,-34.362233 2.354259,-6.780955 4.816054,-12.42588 11.77034,-19.380167 8.711246,-8.711248 13.525442,-10.106093 21.179906,-12.6322565 14.577074,-2.2398827 32.900414,-1.4718298 44.042344,6.8211005 7.90171,5.92206 15.72147,20.590366 7.14575,30.796848 -4.21381,5.015113 -7.80786,5.300701 -12.95428,5.544718 -7.11332,0.337277 -14.60892,-1.93353 -17.04257,-10.875165 -0.71251,-2.617718 -0.028,-8.722106 1.2217,-10.723288 1.2497,-2.001182 3.69653,-6.805633 2.27232,-9.864681 -1.619,-3.477433 -3.06253,-5.931801 -10.24439,-5.241732 -11.733847,1.12751 -16.039561,9.56843 -19.064078,16.913793 -3.285502,7.979192 -5.223284,16.332206 -4.908825,24.730718 0.108286,7.115082 0.648834,13.926236 5.797181,12.27008 4.71841,-1.51785 25.349112,-5.639731 37.674702,-3.904301 6.6183,0.931813 11.92476,3.33518 17.17414,7.778388 5.67235,6.496308 7.62659,6.868899 8.6809,22.250051 0.31413,18.649362 -7.3914,32.028072 -23.07009,40.898882 -17.09931,5.89958 -34.724175,6.09235 -49.527286,-1.22788 C 72.88755,130.28611 66.809866,121.20368 61.733822,108.78991 Z m 45.635568,23.28265 c 4.7189,-0.0676 10.00227,-2.49743 12.61505,-6.42756 5.8462,-8.79382 5.91666,-17.74062 4.82659,-26.807548 C 123.32144,86.447529 116.42175,79.48582 107.33268,78.957844 92.68986,77.829575 88.008022,90.564525 87.847802,102.26124 c -0.117285,9.81745 0.449902,17.97736 3.625242,22.277 3.483524,4.71694 10.033126,7.61824 15.896346,7.53432 z"
            break;
        case "28":
            d="m 85.317525,285.22439 c -20.355087,-7.20807 -28.436507,-16.38871 -28.227948,-32.06732 0.07882,-5.94184 1.552957,-12.02834 3.776235,-15.59345 10.137395,-16.25587 10.120672,-16.1548 4.30953,-26.04003 -4.327432,-7.36121 -5.290884,-11.31198 -5.175516,-21.22175 0.122291,-10.52414 0.93914,-13.16181 6.01771,-19.43656 3.231742,-3.99297 10.184985,-9.47761 15.45163,-12.18805 8.164299,-4.20183 17.853721,-5.95965 27.118324,-6.10622 8.70274,-0.13767 13.93521,0.65447 25.64237,4.92725 11.70715,4.27278 25.04468,31.73016 12.01495,50.2762 -3.50124,4.98354 -3.52991,5.58734 -0.4855,10.23317 7.35002,7.32437 12.33111,15.81006 12.53255,26.07746 0,30.60875 -39.62649,52.94826 -72.974039,41.1393 z m 24.440945,-6.02257 c 26.21736,-8.77797 27.86234,-31.65095 3.11358,-43.29333 -17.109194,-8.04855 -26.016378,-10.08996 -31.415993,-7.20017 -7.55012,4.04063 -11.574988,13.58114 -10.49057,24.8666 1.217245,12.66795 7.10758,20.87483 17.665263,24.61262 10.324354,3.6551 12.87452,3.77748 21.12772,1.01428 z m 28.16614,-80.55915 c 3.79481,-9.08236 3.55611,-15.36934 -0.91194,-24.01765 -4.47353,-8.65877 -9.0681,-11.70141 -21.05003,-13.93986 -10.12958,-1.89244 -23.735412,1.22815 -29.975019,6.87492 -6.122018,5.54034 -4.89888,15.31587 2.620807,20.94482 12.133102,9.08244 29.467352,16.29612 40.057592,16.67013 5.58748,0.19743 6.80591,-0.66229 9.25859,-6.53236 z M 55.708123,130.36085 C 58.003229,110.83264 66.82024,100.34879 99.533346,78.250159 122.84752,62.500825 129.88039,47.578288 122.4019,29.726939 116.2725,15.095841 102.69606,9.2007164 90.21627,15.751427 c -11.807415,6.197685 -12.050379,9.12672 -1.588834,19.151251 9.629655,9.227499 10.989155,13.607974 7.264051,23.4059 C 92.835516,66.346457 86.217102,70.77106 77.1407,70.844067 67.622621,71.452085 64.325094,64.910986 61.385703,59.045126 57.162804,50.617887 55.584505,39.819321 61.355789,30.766861 68.663898,19.304004 78.192249,12.195427 89.539483,8.1603214 101.85979,3.7791905 116.19417,4.2807583 128.76672,7.8745253 c 9.42028,2.6927137 20.61825,9.4438567 24.83857,15.7155067 4.83598,7.186554 7.42937,20.916747 5.49355,29.084064 -2.83356,11.954605 -9.43783,17.508048 -30.51304,25.65798 -10.99903,4.253395 -23.18746,8.848988 -27.08534,10.212316 -3.897845,1.363405 -9.160594,4.073645 -11.695049,6.022798 l -4.608041,3.543878 8.849056,0.04425 c 4.866986,0.02212 14.076814,1.464693 20.466334,3.201822 17.80994,4.84217 19.951,5.17067 25.16763,3.8614 2.66802,-0.66965 6.96082,-3.4929 9.53956,-6.273849 6.47902,-6.987346 8.21652,-3.055957 4.22444,9.558349 -6.25441,19.76262 -18.36276,32.13612 -31.74008,32.43507 -3.71471,0.0832 -13.09486,-3.1261 -22.478752,-7.69031 -18.970546,-9.2272 -25.368759,-8.99381 -35.356012,1.28974 -3.494963,3.5987 -7.044517,6.54305 -7.887815,6.54305 -0.843371,0 -0.966472,-4.82338 -0.273314,-10.7185 z"
            break;
        case "38":
            d="M 88.982937,284.86128 C 75.650259,280.07836 67.733015,273.94171 63.048702,264.7597 c -3.654358,-7.16319 -3.799967,-8.72307 -1.627369,-17.43451 1.312348,-5.26209 3.818743,-11.27931 5.569771,-13.37164 1.751013,-2.09233 4.300019,-6.04742 5.664445,-8.78913 2.22891,-4.47869 1.955385,-5.77878 -2.694026,-12.80449 -10.013349,-15.13118 -8.101746,-34.80171 4.496124,-46.26549 21.815562,-19.8517 68.354683,-15.67353 79.164893,7.10731 4.67754,9.85709 3.75267,21.61131 -2.47277,31.42784 -5.99227,9.44884 -5.3254,14.6501 2.40894,18.78938 8.88081,4.75288 11.12086,21.58493 4.69256,35.26059 -10.74228,22.85309 -43.75936,35.33284 -69.268333,26.18172 z m 29.554733,-8.30509 c 10.77643,-4.63592 15.18494,-10.31583 15.18494,-19.56429 0,-12.15824 -12.57545,-22.55976 -33.71443,-27.8862 -8.365827,-2.10791 -10.723501,-2.08361 -14.903757,0.15385 -6.775085,3.6259 -10.349017,11.29686 -10.340525,22.1945 0.0093,12.01512 5.372773,20.66716 15.724701,25.36641 10.387451,4.71535 16.610501,4.65676 28.049071,-0.26384 z m 21.98377,-76.16314 c 6.24512,-12.07674 1.54221,-29.67147 -9.65198,-36.11071 -7.44952,-4.28522 -26.80531,-4.60478 -34.881278,-0.57584 -6.172048,3.07903 -11.720781,9.45147 -11.720781,13.4607 0,1.25623 2.179678,4.87445 4.843732,8.04047 4.205087,4.99745 10.484245,8.54723 33.198737,18.76794 9.05298,4.07358 14.84125,2.93489 18.21157,-3.58249 z M 91.15777,140.40854 C 71.388543,138.0802 53.759226,116.00893 59.534871,100.81787 65.29071,85.678857 83.959913,81.893057 93.241999,93.98266 c 3.591459,4.677748 2.871653,17.50063 -1.37321,24.46288 -4.672948,7.66432 -4.79714,11.61482 -0.468443,14.90082 9.415174,7.14714 23.161804,-0.0431 30.427844,-15.91326 8.00877,-17.49346 2.78478,-32.506591 -12.44797,-35.773833 -2.82725,-0.606757 -8.3872,-2.471041 -12.355322,-4.143592 -8.539125,-3.599236 -7.251417,-5.668843 6.715232,-10.79268 11.49325,-4.21643 16.9565,-11.636899 17.334,-23.544185 0.53056,-16.721768 -7.60229,-27.018397 -21.339712,-27.018397 -13.12856,0 -14.734237,4.36035 -5.9035,16.031324 7.248232,9.579518 7.461162,17.782527 0.638755,24.60494 -9.55968,9.559665 -27.493918,5.059778 -33.021732,-8.285545 -5.138537,-12.405561 9.56712,-30.783486 25.165552,-36.260312 4.112794,-1.444059 8.17361,-3.2468175 12.484834,-3.890037 19.255373,-2.8728341 43.055123,3.795428 51.231453,19.257231 3.51492,6.64678 4.22692,10.154569 3.2707,16.114003 -1.67571,10.443792 -5.05669,15.134118 -15.1907,21.072985 -9.8683,5.783229 -10.0816,8.694466 -0.77636,10.597566 3.83913,1.36258 9.20151,4.243311 13.6482,9.010352 6.47668,6.943402 6.99259,11.594187 7.16857,18.0726 0.17613,6.48365 -0.94637,11.62173 -6.18186,18.45004 -9.05032,11.80362 -22.69953,18.49087 -39.82598,19.51216 -7.64993,0.4565 -17.228057,0.43854 -21.284608,-0.0359 z"
            break;
        case "48":
            d="m 90.818016,287.55877 c -10.007884,-2.32147 -20.632787,-8.65955 -27.039817,-15.20143 -5.22192,-6.74243 -6.259817,-8.31781 -7.166477,-18.04054 0.658504,-4.63738 2.207597,-14.86632 6.717358,-21.13591 3.61826,-5.03019 10.215641,-13.17175 3.581539,-18.24075 -3.284487,-2.50961 -4.898766,-6.81172 -5.326011,-8.2208 -0.26872,-0.88625 -1.763732,-4.50796 -2.003485,-14.4358 5.013831,-31.21947 30.814766,-37.67257 52.271107,-37.70361 14.4058,-0.20156 29.36269,2.74874 37.82618,13.84944 11.04839,10.15601 8.00921,22.05564 3.7822,34.399 -0.58362,1.83938 -2.61852,5.76987 -4.52276,8.73435 -3.38753,5.27394 -3.37439,5.45922 0.61105,8.59979 2.24032,1.76535 4.9682,2.86441 7.32524,5.12781 10.78865,10.36011 7.48887,33.21881 -4.48482,44.64779 -12.55643,11.98519 -32.69262,19.28362 -48.00138,19.09911 -2.62768,-0.13435 -8.734271,-0.79965 -13.570141,-1.47845 z m 22.847584,-8.66841 c 5.68317,-1.51266 13.06243,-6.69238 16.03095,-9.91728 8.49084,-9.22412 5.6378,-22.45864 -0.55389,-28.49689 -11.72489,-6.96223 -27.79269,-15.3732 -42.09138,-12.32632 -5.770021,1.22952 -10.426387,6.4198 -13.482097,11.46633 -2.424575,4.00421 -3.768902,6.66962 -3.104324,13.69575 1.712729,14.34561 11.506388,23.16862 22.456893,26.19698 10.655428,2.16005 14.104088,1.14484 20.743848,-0.61857 z m -1.49593,-117.61685 c -10.41338,0.0145 -20.649445,3.47566 -25.940716,8.76693 -7.007898,8.99201 -4.226879,17.16436 3.225501,22.3377 12.554015,3.30315 25.324255,11.76815 36.990895,14.39639 18.29167,1.00387 23.81888,-16.84217 17.13729,-28.79619 -6.11939,-10.94818 -23.38987,-16.01981 -31.41297,-16.70483 z M 99.596569,140.21888 c -0.661616,-1.07022 1.345911,-2.4417 4.495601,-3.07168 6.51049,-1.30207 7.87533,-4.59983 7.91405,-19.12194 0.0288,-9.44812 -0.18491,-9.83636 -5.94596,-10.98855 -3.28461,-0.65655 -16.200649,-1.19445 -28.70224,-1.19445 H 52.526079 L 55.82031,100.5869 C 63.422088,86.61295 74.266296,75.830023 80.570111,62.26991 88.238318,45.581525 93.685061,29.641985 97.509447,9.8409932 c 1.155517,-0.772199 12.205743,-1.417203 24.555943,-1.433309 18.69882,-0.02167 22.66504,0.315287 22.66504,0.315287 l -4.0323,7.9590348 c -21.03481,26.493112 -41.191931,50.112975 -66.870078,75.204407 -5.520815,5.355344 -6.180192,6.782734 -3.822135,8.273537 3.864677,2.44336 39.572243,2.37402 41.088763,-0.0794 0.65946,-1.066973 1.25354,-9.335867 1.32028,-18.375313 l 0.12134,-16.435392 14.88702,-15.068099 c 8.18779,-8.287468 15.81423,-15.06817 16.94749,-15.06817 1.38211,0 2.06915,9.595317 2.08662,29.143627 0.0362,37.569487 0.083,37.743347 10.70757,37.743347 4.60734,0 8.37689,0.85995 8.37689,1.91103 0,1.05107 -2.79489,1.92425 -6.21096,1.94029 -8.50662,0.0433 -10.93992,2.01257 -12.22098,9.90654 -1.32642,8.17399 3.61281,19.8183 9.00448,21.22828 2.03187,0.53161 3.6943,1.90656 3.6943,3.05601 0,2.76203 -58.50785,2.91407 -60.212161,0.15673 z"
            break;
        case "68":
       d="m 89.641959,286.34803 c -6.091224,-1.08289 -14.460199,-4.1589 -19.557186,-7.89039 -8.206046,-6.0076 -11.742794,-14.47656 -12.222488,-24.77907 0,-3.02635 0.534215,-10.25664 3.22505,-16.97287 1.877979,-6.86477 12.760123,-13.87442 8.312706,-18.95194 -8.306184,-10.52135 -8.155074,-22.15291 -7.535616,-32.06645 0.988458,-10.15387 4.545288,-17.58679 10.602601,-22.09159 10.363124,-7.70699 25.087184,-10.91372 37.082924,-10.57397 22.40839,-0.028 40.19556,12.10711 40.44969,35.3139 -0.03,5.98938 -1.69737,13.28898 -4.20891,18.39114 l -4.16437,8.45993 5.92034,5.92041 c 3.25626,3.25618 6.76614,8.83411 7.79979,12.39544 1.47792,7.47504 1.50325,18.98101 -3.25276,29.17974 -12.84108,22.16499 -38.06606,27.21054 -62.451936,23.66572 z m 36.262171,-38.89352 c -3.79968,-8.0696 -13.06333,-13.98123 -28.317287,-18.07075 -13.089683,-3.55381 -21.825605,2.77265 -24.517344,10.81583 -1.960759,5.85894 -2.399748,13.88134 0.103969,20.48932 3.485706,9.19971 11.626773,16.40671 19.992681,17.86971 8.655331,0.19242 17.992671,0.61916 24.734031,-3.015 5.14853,-2.77549 8.8674,-6.57241 10.09562,-12.30502 0.94758,-4.42261 0.41274,-10.32042 -2.09167,-15.78409 z m 4.80008,-41.46184 c 3.22245,-0.86427 4.92204,-3.6804 6.70375,-11.10739 3.4695,-14.46241 -0.62158,-23.58623 -9.92748,-29.74436 -8.4735,-5.73051 -19.67663,-7.81094 -33.321072,-3.53195 -6.801517,4.25752 -11.330221,9.94685 -12.873438,13.99102 -0.364601,6.9205 2.081082,12.7906 7.829698,16.99138 6.695278,4.89255 17.244992,7.69139 23.367952,9.88952 14.70563,5.19996 13.08848,4.88828 18.22059,3.51178 z M 94.263057,140.56042 C 86.380749,136.22221 78.177578,130.73786 72.627535,124.50295 61.636812,112.156 58.526977,95.19222 57.860913,80.030985 57.24984,65.160427 58.847713,58.020718 62.65801,47.815196 68.734065,31.541057 76.278597,22.440701 91.177355,13.142125 101.9458,6.8253334 129.52793,7.7152158 136.93779,14.618528 c 8.83502,5.413092 12.54519,12.028688 12.79,21.097415 -2.06123,11.966307 -4.10869,12.699234 -14.8271,15.282998 -6.64319,-0.174137 -9.40702,-1.460112 -13.86725,-6.451978 -4.56681,-12.085178 11.17873,-17.856955 2.25051,-27.328709 -1.56064,-1.560617 -11.35841,-2.124464 -14.36527,-1.72015 -5.07898,0.682938 -10.943469,5.400765 -13.802068,9.255171 -4.196828,5.658814 -6.092881,11.031271 -9.110522,17.847324 -3.467043,8.29789 -1.06188,24.527154 2.036711,27.625676 1.533007,1.533071 6.427732,2.075174 12.785209,-1.305077 14.82703,-7.883643 34.57165,-5.771106 46.20319,4.943349 7.23962,6.668952 10.20811,15.87541 8.89731,27.594073 -3.0247,19.99589 -12.55545,29.8133 -28.30003,36.94997 -12.81716,5.75202 -22.92549,5.32774 -33.365423,2.15183 z m 26.662053,-12.69153 c 3.7789,-4.91765 6.56591,-15.19039 6.39568,-24.7289 -0.12609,-7.067253 -2.16356,-13.371472 -5.11538,-18.681385 -3.0526,-5.491192 -8.53809,-7.90719 -14.68738,-8.345009 -5.73344,-0.03249 -11.591099,5.060918 -14.282355,10.301341 -4.166722,8.113452 -4.057836,15.490153 -4.232197,21.430723 0,10.41509 6.429723,24.19878 11.554682,25.19833 8.6516,2.18489 13.98633,0.77049 20.36695,-5.1751 z"
            break
        }
    return(
        <svg
        className={styles[className]}

        height={height}
        width={width}
        viewBox="0 0 210 297">
            <path
            style={{"fill":colour}}
            d={d}/>
        </svg>
    )
}