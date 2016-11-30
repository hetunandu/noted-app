import React from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet
} from 'react-native';


export class TitleNode extends React.Component{
	render(){
		return <Text style={styles.title}>{this.props.data}</Text>
	}
}

export class TextNode extends React.Component{
	render(){
		return <Text style={styles.text}>{this.props.data}</Text>
	}
}

export class QuoteNode extends React.Component{
	render(){
		return <Text style={styles.quote} >{this.props.data}</Text>
	}
}

export class ImageNode extends React.Component{
	render(){
		return (
			<Image
                style={{minHeight: 200, backgroundColor: "#f2f2f2"}}
                resizeMode="contain"
                source={{uri: `${this.props.data}`}}
            />
        );
	}
}

export class PointerNode extends React.Component{
	render(){
		return (
			<View>
			{
				this.props.data.map((point, j) => {
			        return (
			            <View key={`point_${j}`} style={styles.pointer}>
			            	<View style={styles.pointerHead} >
				                <Text style={styles.pointerIndex}>{j + 1}.</Text>
				                <Text style={styles.pointerTitle}>{point.title}</Text>
				            </View>
			                <View style={styles.pointNodes}>
			                {
			                    point.nodes.map((node, k) => {
			                        switch(node.type){
			                            case 'text':
			                                return <TextNode key={k} data={node.data} />
			                            case 'image':
			                                return <ImageNode key={k} data={node.data} />
			                            default: 
			                            	return <TextNode key={k} data={node.type} />
			                        }
			                    })
			                }
			                </View>
			            </View>
		        	)
				})
			}
		</View>
		)
	}
}


const styles = StyleSheet.create({
	title: {
	    fontSize: 30,
	    color: '#000',
	    fontWeight: "200"
	},
	text: {
	    fontSize: 18,
	    marginBottom: 5
	},
	quote: {
	    paddingLeft: 20,
	    fontSize: 20,
	    borderLeftWidth: 5,
	    borderLeftColor: "#50537f",
	    fontStyle: 'italic',
	    marginBottom: 5
	},
	pointer:{
		marginBottom: 5
	},
	pointerHead:{
		paddingLeft: 3,
		backgroundColor: "#f4f4f4",
		flexDirection: 'row',
		alignItems: 'center'
	},
	pointerIndex: {
		fontSize: 25,
		color: '#666',
		fontWeight: "500",
		marginRight: 5
	},
	pointerTitle: {
	    fontSize: 20,
	    fontWeight: "400"
	},
	pointNodes: {
	    paddingLeft: 20
	},
})