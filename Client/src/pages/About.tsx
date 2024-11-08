export const About = () => {
  return (
    <>
      <div className="box-container">
        <section className="about-container">
          <h2>About the project</h2>
          <p>
            Heart disease is sadly the world’s biggest killer and prevalence is
            growing. This is caused by a lot of factors, including lifestyle,
            genetics and the environment. On this page, you can learn
            specifically about the environmental factors—particularly air
            pollution like PM2.5—and their impact on your health. The main
            feature of this site is an interactive map, where you can explore
            air quality levels worldwide and even check conditions in your own
            area.
            <br />
            <br />
            The data on PM₂.₅ on our site is collected by researchers at
            Washington University in St. Louis (WUSTL). They utilize a
            combination of satellite measurements and ground-based monitoring
            stations to gather comprehensive air quality information. By
            integrating these diverse data sources, the team at WUSTL is able to
            analyze and understand the impacts of PM₂.₅ on health and the
            environment. These dedicated researchers employ advanced modeling
            techniques to process the data, enabling them to highlight the risks
            associated with air pollution. Their work is essential in promoting
            awareness and guiding efforts to improve air quality. If you would
            like to read more about their work you can visit their page here:{" "}
            <a
              className="about-links"
              target="_blank"
              href="https://sites.wustl.edu/acag/datasets/surface-pm2-5/"
            >
              {" "}
              WUSTL
            </a>{" "}
            <br />
            <br />
            This project is part of the Nightingale Project at Mainz University,
            an initiative focused on advancing research in heart desease through
            AI. If you're interested in learning more about our work, feel free
            to visit the{" "}
            <a
              className="about-links"
              target="_blank"
              href="https://nightingale.uni-mainz.de/"
            >
              Nightingale Project’s{" "}
            </a>{" "}
            page.
          </p>
        </section>
      </div>
    </>
  );
};
