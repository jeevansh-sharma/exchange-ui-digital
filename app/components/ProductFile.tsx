import {Body, Container, Head, Html, Preview, Tailwind,Text,Section, Button} from "@react-email/components"
export default function ProductFile({link}:{link:string}){
    return(
        <Html>
            <Head/>
            <Preview>Product is here ...</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container style={container}>
                         <Text className="text-2xl font-semibold">Hi Friend,</Text>
                         <Text className="text-lg text-grey-600">Thanks for buying your product at Exchange UI</Text>
                         <Section className="w-full justify-center mt-7">
                            <Button href={link} className="text-white bg-green-600 rounded-lg px-10 py-4">
                                Your Download Link
                            </Button>

                         </Section>
                         <Text className="text-lg">
                            Best, <br />
                            Exchange UI Team
                         </Text>
                    </Container>
                    
                </Body>
            </Tailwind>
        </Html>
    )
}

const container={
    margin: "0 auto",
    padding: "20px 0px 48px",
}