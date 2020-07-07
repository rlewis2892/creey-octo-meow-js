import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {UseJwtProfileId} from "../utils/jwt-helpers";
import {fetchProfileByProfileId} from '../store/profiles'

import { NavBar } from './shared/components/NavBar'
import { Footer } from './shared/components/Footer'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Profile = ({match}) => {

  const dispatch = useDispatch();

  // grab the profile id from the JWT for the currently logged in account
  const currentProfileId = UseJwtProfileId();

  // Return the profile from the redux store
  const profile = useSelector(state => (state.profiles ? state.profiles[0] : []));

  const effects = () => {
    dispatch(fetchProfileByProfileId(match.params.profileId));
  };
  const inputs = [match.params.profileId];
  useEffect(effects, inputs);

  return (
    <>
      <main className="mh-100 d-flex flex-column">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid className="py-5">
            <Row>
              <Col md="5">
                <Card className="bg-transparent-90">
                  <Card.Header>
                    <h2 className="my-0">Hello, {profile && profile.profileUsername}!</h2>
                  </Card.Header>
                  <Card.Body>
                    <div><span className="font-weight-bold">Username</span>: {profile && profile.profileUsername}</div>

                    {/* only show the private profile data if logged into the same account! */}
                    {(profile && profile.profileId === currentProfileId) && (
                      <>
                        <div><span className="font-weight-bold">Your Profile Id</span>: {profile && profile.profileId}</div>
                        <div><span className="font-weight-bold">Your Email Address</span>: {profile && profile.profileEmail}</div>
                      </>
                    )}

                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="text-center text-md-right">
          <Footer/>
        </section>

      </main>
    </>
  )
};