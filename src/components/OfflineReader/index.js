import React from 'react';
import {
	View,
	Text,
  ListView
} from 'react-native';
import {
  Explanation
} from '../../components';
import styles from './styles';

class OfflineReader extends React.Component {

	render() {

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const index = ds.cloneWithRows(this.props.index)
		return (
			  <View style={styles.container}>
          <ListView
            dataSource={index}
            renderRow={(rowData) => this.renderRow(rowData)}
            renderSectionHeader={(sectionData, sectionID) => this.renderSectionHeader()}
            scrollRenderAheadDistance={500}
          />
        </View>
		);
	}

  renderRow(chapter){
    return (
      <View>
        <Text style={styles.chapterName}>{chapter.name}</Text>
          <View style={styles.conceptsContainer}>
            {
              chapter.concepts.map(concept => {
                return (
                  <Explanation
                    explanation={concept.explanation}
                    key={concept.key}
                  />
                )
              })
            }
          </View>
      </View>
    )
  }

  renderSectionHeader(sectionData, sectionID){
    console.log(sectionData, sectionID)
    return (
      <Text>Header</Text>
    )
  }
}

export default OfflineReader;
