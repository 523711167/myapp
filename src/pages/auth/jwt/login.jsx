import { Row, Col } from 'antd';
import { useResponsive } from '@/hooks/use-responsive';

function Login() {

    const smDown = useResponsive('between', 'sm', 'md');
    console.log('smDown', smDown);
    return (
        <div>
            <Row>
                {Array.from({ length: 10 }).map((_, index) => {
                    const key = `col-${index}`;
                    return (
                        <Col
                            key={key}
                            xs={{ flex: '100%' }}
                            sm={{ flex: '50%' }}
                            md={{ flex: '40%' }}
                            lg={{ flex: '20%' }}
                            xl={{ flex: '10%' }}
                        >
                            Col
                        </Col>
                    );
                })}
            </Row>
        </div>
    )
}

export default Login;
