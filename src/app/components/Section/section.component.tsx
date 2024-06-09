import Button from '../Button';
import { Section as StyledSection, Wrapper, Header } from './section.styles';

type SectionProps = {
  title: string;
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  handleOpenTable?: () => void;
};

const Section = ({ title, children, headerSlot, handleOpenTable }: SectionProps) => {
  return (
    <Wrapper>
      <Header>
        <h1>{title}</h1>
        {handleOpenTable ? <Button onClick={handleOpenTable}>Show table</Button> : null}
        {headerSlot}
      </Header>
      <StyledSection>{children}</StyledSection>
    </Wrapper>
  );
};

export default Section;
