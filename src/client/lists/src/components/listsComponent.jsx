import React from "react";
import ListServices from "../services/lists.service";
import { Tabs, Radio, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ModalForm from './modalForm';
import 'antd/dist/antd.css';


const { TabPane } = Tabs;

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            mode: 'left',
            formVisible: false,
            formTitle: '',
            onCreate: {}
        }
    }

    async componentWillMount(){
        const lists = await ListServices.getall();
        this.setState({lists});
    }

    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({ mode });
      };

    getAllLists = () =>{
        ListServices.getall()
        .then( response =>
            this.setState({lists: response})
        );
    }

    addNewList = data =>{
        ListServices.createList(data)
        .then(response =>{
            this.getAllLists();
            this.setState({formVisible: false});
        }).catch(error => {
            this.setState({formVisible: false});
        });
    }

    deleteList = id =>{
        ListServices.deleteList(id)
        .then(response =>{
            this.getAllLists();
        }).catch(error => {
            console.log(error);
        });
    }

    editList = data => {
        ListServices.editList(data, this.state.idToEdit)
        .then(response => {
            this.getAllLists();
            this.setState({formVisible: false});
        }).catch(error => {
            console.log(error);
        });
    }

    addItem = data => {
        ListServices.addItem(data, this.state.idToEdit)
        .then(response => {
            this.getAllLists();
            this.setState({formVisible: false});
        }).catch(error => {
            console.log(error);
        });
    }

    editItem = (data) => {
        const { listId, itemId } = this.state.idToEdit;
        ListServices.editItem(data, listId, itemId)
        .then(response => {
            this.getAllLists();
            this.setState({formVisible: false});
        }).catch(error => {
            console.log(error);
            this.setState({formVisible: false});
        });
    }

    deleteItem = (listId, itemId) => {
        ListServices.deleteItem(listId, itemId)
        .then(response => {
            this.getAllLists();
            this.setState({formVisible: false});
        }).catch(error => {
            console.log(error);
            this.setState({formVisible: false});
        });
    }

    render(){
        const { lists, mode, formVisible } = this.state;
        return(
            <div><p>My lists of favourite things</p>
            <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                <Radio.Button value="top">Horizontal</Radio.Button>
                <Radio.Button value="left">Vertical</Radio.Button>
            </Radio.Group>
            <Tabs tabPosition={mode} >
                {lists.map(list => (
                    <TabPane tab={list.name} key={list._id}>
                        {list.items.map(item => {
                            return <p key={item._id}>{item.name}
                                <Button shape="circle" icon={<EditOutlined 
                                    onClick= { () => {
                                        this.setState({
                                            formVisible: true,
                                            formTitle: 'Enter new name for item',
                                            onCreate: this.editItem,
                                            idToEdit: {listId: list._id, itemId: item._id},
                                            okText: 'Edit'
                                        });
                                    }}
                                />}/>
                                <Button shape="circle" icon={<DeleteOutlined 
                                    onClick= { () => this.deleteItem(list._id, item._id) }
                                />}/>
                            </p>
                        })}
                        <Button onClick={ () => this.deleteList(list._id) }>Delete List</Button>
                        <Button onClick={ () => {
                            this.setState({
                                formVisible: true,
                                formTitle: 'Enter new name for List',
                                onCreate: this.editList,
                                idToEdit: list._id,
                                okText: 'Edit'
                            });
                        } }>Edit List Name</Button>
                        <Button onClick={ () => {
                            this.setState({
                                formVisible: true,
                                formTitle: 'Add new item to the list',
                                onCreate: this.addItem,
                                idToEdit: list._id,
                                okText: 'Add'
                            });
                        } }>Add item</Button>
                    </TabPane>
                ))}
            </Tabs>
            <Button
                type="primary"
                onClick={() => {
                this.setState({
                    formVisible: true,
                    formTitle: 'New List',
                    onCreate: this.addNewList,
                    okText: 'Create'
                });
                }}
            >
                New List
            </Button>
            <ModalForm
                visible={formVisible}
                formTitle={this.state.formTitle}
                okText={this.state.okText}
                onCreate={this.state.onCreate}
                onCancel={() => {
                    this.setState({formVisible: false});
                }}
            />
            </div>
        )
    }
}

export default Lists;