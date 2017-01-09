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
		const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData
		});

		const { dataBlob, sectionIds, rowIds } = this.formatData(this.props.index);

    const index = ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
		return (
			  <View style={styles.container}>
          <ListView
            dataSource={index}
            renderRow={(rowData) => this.renderRow(rowData)}
            renderSectionHeader={(sectionData) => this.renderSectionHeader(sectionData)}
            scrollRenderAheadDistance={500}
          />
        </View>
		);
	}

  renderRow(concept){
    return (
			<Explanation explanation={concept.explanation} />
		)
  }

  renderSectionHeader(sectionData){
    return (
			<View style={{backgroundColor: '#50537f', padding: 5}}>
      	<Text style={styles.chapterName}>{sectionData.name}</Text>
			</View>
    )
  }

	formatData(index){

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a chapter so we loop over it
    for (let sectionId = 0; sectionId < index.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChapter = index[sectionId];

      // Get concepts in this chapter
      const concepts = currentChapter.concepts

      // Add a section id to our array so the listview knows that we've got a new section
      sectionIds.push(sectionId);

      // Store any data we would want to display in the section header. In our case we want to show
      // the current character
      dataBlob[sectionId] = { name: currentChapter.name };

      // Setup a new array that we can store the row ids for this section
      rowIds.push([]);

      // Loop over the concepts for this section
      for (let i = 0; i < concepts.length; i++) {
        // Create a unique row id for the data blob that the listview can use for reference
        const rowId = `${sectionId}:${i}`;

        // Push the row id to the row ids array. This is what listview will reference to pull
        // data from our data blob
        rowIds[rowIds.length - 1].push(rowId);

        // Store the data we care about for this row
        dataBlob[rowId] = concepts[i];
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }
}

export default OfflineReader;
