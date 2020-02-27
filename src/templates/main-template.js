import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import DayAuthor from "../components/DayAuthor/DayAuthor"
import ImageParallax from '../components/parallax/image-parallax/image-parallax'
import { graphql } from "gatsby"
import { getFields } from "../utils/fields"
import Particles from 'react-particles-js';
import particlesConfig from '../components/parallax/particles-config.js'


const Main = ({ data, location, pageContext }) => {
  const authorData = data.dayAuthor.nodes;
  const source = data.about.frontmatter.fields;
  const { lang: currentLang } = pageContext
  const header = getFields("portalDescriptionLabel", source, currentLang)
  const content = getFields("portalDescriptionData", source, currentLang)
  const author = getFields("authorOfTheDay", source, currentLang);
  const labelMore = getFields("labelMore", source, currentLang)
  return (
    <Layout location={location}>
      <Particles params={particlesConfig} className="particles"/>
      <h1 className="visually-hidden">
        Belarusian Filmmakers - portal, dedicated to film directors of Belarus
      </h1>
      <SEO title="Home" />
      <section className="about">
        <h1 className="page-title">
          {header}
        </h1>
        <p className="content-centered">
          {content}
        </p>
      </section>
      <section className="day-author">
        <ImageParallax imgKey="dayAuthor">
          <h2 className="page-title light">
            {author}
          </h2>
        </ImageParallax>
        <DayAuthor authorsList={authorData} labelMore={labelMore} lang={pageContext.lang} />
      </section>
    </Layout>
  )
}

export default Main

export const query = graphql`
  query($lang: String!) {
    dayAuthor: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "director" }, lang: { eq: $lang } } }
    ) {
      nodes {
        frontmatter {
          city
          directorsLifeYears
          title
          titleText
          imagepath
          slug
        }
      }
    }
    about: markdownRemark(
      frontmatter: { type: { eq: "page" }, name: { eq: "main" } }
    ) {
      frontmatter {
        fields {
          fieldName
          fieldData {
            ru
            be
            en
          }
        }
      }
    }
  }
`
