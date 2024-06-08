import Button from '../Button';
import { Section as StyledSection, Wrapper, Header } from './section.styles';

type SectionProps = {
  title: string;
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
};

const Section = ({ title, children, headerSlot }: SectionProps) => {
  return (
    <Wrapper>
      <Header>
        <h1>{title}</h1>
        <Button onClick={() => console.log('Button clicked')}>Show table</Button>
        {headerSlot}
      </Header>
      <StyledSection>{children}</StyledSection>
    </Wrapper>
  );
};

export default Section;
