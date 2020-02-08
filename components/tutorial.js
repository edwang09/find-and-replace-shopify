import React from 'react'
import { 
    Modal,
    TextContainer,
    Card
  } from '@shopify/polaris';
  import { Redirect } from '@shopify/app-bridge/actions';
  const tutorialText = [
      "To get started, you'll need to select the relevant in fields. There's also an option to select all.",
      "Type in your keywords here. You also have the option to match case.",
      "There are 4 main operations, Replace searched text with text you specify. For example:",
      "Insert in front of the column with text you specify. For example:",
      "Append to end of the column with text you specify. For example:",
      "Remove searched text. For example:",
      "For keywords/phrases that you use regularly, save them to favorites",
      "Once saved to favorites, you can bundle together multiple queries and run them as a set with one click."
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
                    Welcome to Find & Replace for Shopify. Want to take a quick tour? It's less than 2 minutes..
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
    const titleText = `Find & Replace for Shopify Tutorial ${props.tutorial}/8`
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
                                <h5><b>replaced text :</b> </h5>
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
                                <h5><b>inserted text :</b> </h5>
                                <p><span style={{color:"orange"}}>Hello, </span>This is a <span style={{color:"green"}}>red</span> apple.</p>
                            </div>
                        )
                    }
                    {
                        props.tutorial === 5 &&
                        (
                            <div>
                                <h5><b>original text :</b></h5>
                                <p>This is a <span style={{color:"green"}}>red</span> apple.</p>
                                <h5><b>appended text :</b> </h5>
                                <p>This is a <span style={{color:"green"}}>red</span> apple.<span style={{color:"orange"}}>Thanks</span></p>
                            </div>
                        )
                    }
                    {
                        props.tutorial === 6 &&
                        (
                            <div>
                                <h5><b>original text :</b></h5>
                                <p>This is a  <span style={{backgroundColor:"#3297FD",color:"white",textDecoration:"line-through"}}>red</span>  apple.</p>
                                <h5><b>deleted text :</b> </h5>
                                <p>This is a apple.</p>
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
