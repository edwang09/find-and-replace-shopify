import React from 'react'
import { 
    Modal,
    TextContainer,
    Card
  } from '@shopify/polaris';
  const tutorialText = [
    "To get started, you'll need to select the relevant in fields. There's also an option to select all.",
    "Type in the keyword(s) you're searching for here. You also have the option to match case.",
    "The first option is to replace searched keyword(s) with new text. For example:",
    "The second option is to insert new text in front of a phrase. For example:",
    "The third option is to append new text to end of a phrase. For example: ",
    "The fourth option is to remove searched keyword(s). For example: ",
    "For keywords/phrases that you use regularly, save them to favorites",
    "Once saved to favorites, you can bundle together multiple queries and run them as a set with one click."
    ]  
    const tutorialTitle = [
        "1/8: In Fields",
        "2/8: Search Keywords",
        "3/8: Operations - Find and Replace",
        "4/8: Operations - Insert in Front",
        "5/8: Operations - Append to End",
        "6/8: Operations - Remove Text",
        "7/8: Favorites",
        "8/8: Favorites"
    ]
  export function Welcome(props) {
    return (
        <div>
            <Modal
                open={(props.tutorial === 0)}
                onClose={props.handleChange("close")}
                title="Welcome to Find & Replace for Shopify"
                primaryAction={{
                content: 'Yes',
                onAction: props.handleChange("next"),
                }}
                secondaryActions={[
                {
                    content: 'No',
                    onAction: props.handleChange("close"),
                },
                ]}
            >
                <Modal.Section>
                <TextContainer>
                    <p>
                    Want to take a quick tour? It's less than 2 minutes..
                    </p>
                </TextContainer>
                </Modal.Section>
            </Modal>
        </div>
    )
}
export function Tutorial(props) {
    if (!props.tutorial || props.tutorial < 1) return null
    const primaryButtonText = (props.tutorial===8?'Close':'Next')
    const titleText = tutorialTitle[props.tutorial-1]
    return (
            <div>
            <Card
                sectioned
                actions={[{
                    content: 'Close tutorial',
                    onAction: props.handleChange("close"),
                }]}
                title={titleText}
                primaryFooterAction={{
                    content: primaryButtonText,
                    onAction: props.handleChange("next"),
                    }}
                secondaryFooterActions={[{
                    content: 'Previous',
                    onAction: props.handleChange("previous"),
                    }]}
            >
                <TextContainer>
                    <p>
                        {tutorialText[props.tutorial-1]}
                    </p>
                    {
                        props.tutorial === 3 &&
                        (
                            <div>
                                <h5><b>original text :</b></h5>
                                <p>This is a <span style={{color:"green"}}>red</span> apple.</p>
                                <h5><b>updated text :</b> </h5>
                                <p>This is a <span style={{backgroundColor:"#3297FD",color:"white"}}>green</span> apple.</p>
                            </div>
                        )
                    }
                    {
                        props.tutorial === 4 &&
                        (
                            <div>
                                <h5><b>original text :</b></h5>
                                <p>This is a <span style={{color:"green"}}>red</span> apple.</p>
                                <h5><b>updated text :</b> </h5>
                                <p><span style={{color:"orange"}}>Hello! </span>This is a <span style={{color:"green"}}>red</span> apple.</p>
                            </div>
                        )
                    }
                    {
                        props.tutorial === 5 &&
                        (
                            <div>
                                <h5><b>original text :</b></h5>
                                <p>This is a <span style={{color:"green"}}>red</span> apple.</p>
                                <h5><b>updated text :</b> </h5>
                                <p>This is a <span style={{color:"green"}}>red</span> apple.<span style={{color:"orange"}}> Isn't that great?</span></p>
                            </div>
                        )
                    }
                    {
                        props.tutorial === 6 &&
                        (
                            <div>
                                <h5><b>original text :</b></h5>
                                <p>This is a  <span style={{backgroundColor:"#3297FD",color:"white",textDecoration:"line-through"}}>large</span> red apple.</p>
                                <h5><b>updated text :</b> </h5>
                                <p>This is a red apple.</p>
                            </div>
                        )
                    }
                    {
                        props.tutorial === 8 &&
                        (
                            <div>
                                <p>you can access and run your saved operations in the <b>favorites tab</b> on the top.</p>
                            </div>
                        )
                    }
                </TextContainer>
            </Card>
        </div>
    )
}
