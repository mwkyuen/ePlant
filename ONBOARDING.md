# ePlant Version 3 Developer Onboarding Blueprint

## Introduction

Thank you for joining us and contributing to ePlant! This guide is meant to be a high-level overview of the ePlant re-write with less technical details and more scope regarding requirements.

ePlant is a gene-first visualization tool for plant genomes. That is, the user enters a gene-of-interest (GOI) to discover more information in a visually exploratory fashion from the phenotype to molecular level. For example, a user may visualize the variation in gene expression across ecotypes (varieties) and later on look at any protein-protein interactors. **Note that different species will have different levels of biological information curated about them. Namely, *Arabidopsis thaliania* is a model plant organism and thus has many layers of information and ePlant modules.**

![Intro-photo] (intro-photo.png)
<img width="1677" alt="intro-photo" src="https://github.com/BioAnalyticResource/ePlant/assets/22639326/956c822c-eccb-4a3c-9449-42d277791a80">

<figcaption>*Eplant v2 (production). An ePlant module visualizing ecotypic variation in expression for GOI, ABI3. Note the many other modules existing on the left sidebar*</figcaption>

You will soon find out that each module is unique in that each is separately developed, with different libraries and API calls.

For example, the BAR is well known for its electronic Fluorescent Pictographic (eFP) browser which visuializes gene expression across different tissues/cells/organelles.

![eFP] (eFP.png)
![efp](https://github.com/BioAnalyticResource/ePlant/assets/22639326/da69cc6f-c87d-4e2d-973b-1446537e3829)
<figcaption>*eFP browser displaying gene expression across different Poplar tissues via a heat-scale*</figcaption>

We database the data provided by researchers who perform the work. Currently we are re-writing many of these webservices in our [BAR API](https://bar.utoronto.ca/api/). However, this data can also be fed to other applications such as ePlant. That is, ePlant v2 is a single-page application (SPA) which makes queries to various webservices - some we host, some which we do not.

## Plant/Tissue/Cell eFP modules

In this module, the user can visualize gene expression across tissues/cells/organelles like above. They can also hover over the specific tissues to learn the specific expression value for that gene-tissue as well. However a major feature to ePlant vis-a-vis eFP browser is the preview pane:
![efp-module] (efp-module.png)
<img width="1630" alt="efp-module" src="https://github.com/BioAnalyticResource/ePlant/assets/22639326/799860e3-2a2f-4511-bdfd-07121608a333">


Moreover there are extra module-specific features in the top toolbar to this module such as expression masking. We wish to keep, refine or add some features to each module. So **please explore each module in depth and ask us questions regarding features** before you solidify an architecture/library. This module namely takes advantage of SVGs we host on the BAR (which you can view on the network inspector tab of ePlant v2) along with XMLs and expression data (from a webservice) to colour-fill specific SVG groups (the SVGs follow a specific format). Thus major features to be included in these modules should be :

- The images be scaled-well, clear, and shown correctly to easily contrast absolute and relative expression
- Tooltip hover
- Preview Pane
- Expression masking
- Compare to another gene

Technical note: Loading many SVGs to the DOM is typically very slow. Can we find a way to minimize SVG DOM loads?

## Chromosome View

Unlike our other views which require a GOI to be selected. A few modules like the chromosome view can be accessed directly without a gene selected. The chromosome viewer should correctly:

- Show the chromosomes and their relative sizes for their respective species (i.e. Humans have 23, Arabidopsis have 5)
- The chromosomes can also be coloured via gene density (redder meaning more genes located in those loci)
- When the user selects a chromosomal locus (area), the genes located in that locus should populate a tooltip
	- The tooltip will have hyperlinks to load those genes directly into ePlant
	- The tooltip should also show the chromosome loci numbers
- From the user selected GOIs, these GOIs should be denoted properly in this view

![Chromosome-module] (chromosome.png)
![chromosome](https://github.com/BioAnalyticResource/ePlant/assets/22639326/850973f5-0afe-402d-8df0-6fafe04054fa)
<figcaption>*Chromosome module displaying genes selected, with a tooltip to add more genes. Note that gene density is turned on*</figcaption>

Technical notes: Note that the chromosomes are drawn dynamically. The webservice for chromosome size is [here] (https://bar.utoronto.ca/eplant/cgi-bin/chromosomeinfo.cgi?species=Arabidopsis_thaliana). When a locus is selected, a query is made to this [webservice] (https://bar.utoronto.ca/eplant/cgi-bin/querygenesbyposition.cgi?chromosome=Chr3&start=15105497.767957352&end=15171733.452802815), therefore the chromosome event listener should retain locus information.

Creative Notes: Could we add additional filters to this module such as a functional annotation?

## Nota Bena (NB)

### Dynamic linkouts

Note that all views should have dynamic links to a specific view, genes loaded (with active gene selected) and any options applied. Ergo, you should design the new module with this in mind. Namely your routing architecture (i.e. React-Router) should include options for each module and options within. See below in ePlant v2, this view has a specific URL that can be shared.

![URLs] (urls.png)
<img width="1052" alt="urls" src="https://github.com/BioAnalyticResource/ePlant/assets/22639326/1a11899a-0129-4703-9c8e-41bfd4031319">

<figcaption>*A URL generated by ePlant v2. Note it includes the genes loaded and the active view & gene as URL parameters*</figcaption>

### Further views to be added
