import Link from 'next/link';
import Layout from '../../components/layout';
import colors from '../../components/colors';
import React, { useState } from 'react';	
import customStyles from "../../styles/color.module.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Color(props) { {

	const [bannersource, setBannersource] = useState("/images/colorpunx-banner-trim.png");

	const baseChildren =  <div>{
		Object.keys(colors).map((k, i) => {
			let data = colors[k];
			return (
				
				<Link href={"/colors/" + data.name.substring(1)} style={{zIndex: 1}}>
				<div key={i}>
					<img src={'/images/colors/colorpunx' + data.id + '.png'}></img>
				</div>
				</Link>
				
			);
		})}</div>;

	const getConfigurableProps = () => ({
		showArrows: true,
		showStatus: true,
		showIndicators: false,
		infiniteLoop: true,
		centerMode: true,
		centerSlidePercentage: 80,
		showThumbs: true, 
		useKeyboardArrows: true,
		autoPlay: false,
		stopOnHover: true,
		swipeable: true,
		dynamicHeight: true,
		emulateTouch: true,
		autoFocus: false,
		thumbWidth: 80,
		selectedItem: props.data.id - 1,
		interval: 2000,
		transitionTime: 500,
		swipeScrollTolerance: 5,
		ariaLabel: undefined,
	});

	return (

		<div>
			<img src={bannersource} width="100%" height="auto" />
			<p className={customStyles.p1}>Colorpunx</p>
			<p className={customStyles.p2}>{props.data.description}<a href={props.data.uri}>It can be purchased on opensea.io.</a></p>
			
			<div className={customStyles.c1}>Colorpunk {props.data.name}</div>

			<div style={{width: "35%", display: "block", marginLeft: "auto", marginRight: "auto"}}>
				<Carousel {...getConfigurableProps()}>{baseChildren.props.children}</Carousel>
			</div>

			<div className={customStyles.c2}>Colorpunk {props.data.name} is used in {props.data.punks.length} Cryptopunks</div>

			<img src={'/images/punks_by_color/' + props.data.id + '.png'} style={{marginLeft: "auto", marginRight: "auto", display: "block", marginBottom: "150px"}} />
	
		</div>
		
		);
	}
}


export async function getStaticPaths() {
	const paths = Object.keys(colors).map((k, i) => {
		return {
			params: {
				id: k.substring(1, 7)
			}
		};
	});

	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	// Fetch data needed for page using params.id
	console.log(params.id);
	return {
		props: {
			id: params.id,
			data: colors['#' + params.id]
		}
	};
}
