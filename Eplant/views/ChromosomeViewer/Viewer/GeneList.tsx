// -------
// IMPORTS
// -------
import React, { FC, useEffect, useState } from 'react'

import GeneticElement from '@eplant/GeneticElement'
import arabidopsis from '@eplant/Species/arabidopsis'
import {
  useActiveGeneId,
  useGeneticElements,
  useSelectedGeneHistory,
  useSetGeneticElements,
} from '@eplant/state'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import useTheme from '@mui/material/styles/useTheme'

import { GeneIcon } from '../icons'
import { GeneArray, GeneItem } from '../types'

import GeneInfoPopup from './GeneInfoPopup'

// TYPES
interface GeneListProps {
  id: string
  start: number
  end: number
  anchorOrigin: number[]
}

//----------
// COMPONENT
//----------
const GeneList: FC<GeneListProps> = ({ id, start, end, anchorOrigin }) => {
  // gene list
  const [geneList, setGeneList] = useState<GeneArray>([
    {
      id: '',
      chromosome: '',
      start: 0,
      end: 0,
      strand: '',
      aliases: [],
      annotation: '',
    },
  ])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedGene, setSelectedGene] = useState<GeneItem | null>(null)
  const [selectedGeneHistory, setSelectedGeneHistory] = useSelectedGeneHistory()
  // gene info popup
  const [open, setOpen] = useState(false)

  // Other/Global State
  const [activeGeneId, setActiveGeneId] = useActiveGeneId()
  const geneticElements = useGeneticElements()
  const setGeneticElements = useSetGeneticElements()
  const theme = useTheme()

  //------------------
  // Helper Functions
  //------------------
  useEffect(() => {
    fetch(
      `https://bar.utoronto.ca/eplant/cgi-bin/querygenesbyposition.cgi?chromosome=${id}&start=${start}&end=${end}`
    )
      .then((response) => response.json())
      .then((json) => {
        setGeneList(json)
      })
  }, [])
  // EVENT HANDLERS
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true)
  }
  const handleGeneSelect =
    (gene: GeneItem, index: number) =>
    (event: React.MouseEvent<HTMLElement>) => {
      setSelectedIndex(index)
      setSelectedGene(gene)
      const tempHistory = [...selectedGeneHistory]
      tempHistory.push(gene)
      setSelectedGeneHistory(tempHistory)
    }
  const handleClose = () => {
    setOpen(false)
  }
  const handleLoadGeneClick = (event: React.MouseEvent<HTMLElement>) => {
    if (selectedGene != null) {
      const gene = new GeneticElement(
        selectedGene.id,
        selectedGene.annotation,
        arabidopsis,
        selectedGene.aliases
      )
      geneticElements[0].push(gene)
      setGeneticElements(geneticElements[0])
      setActiveGeneId(gene.id)
    }
  }

  return (
    <>
      {/* GENE LIST */}
      <List sx={{ padding: 0 }} onClick={handleClick}>
        {geneList.map((gene, i) => {
          return (
            <ListItem
              key={i}
              disablePadding
              sx={{
                height: 23,
              }}
            >
              {/* GENE LIST ITEM (rendered as  button) */}
              <ListItemButton
                selected={i === selectedIndex}
                onClick={handleGeneSelect(gene, i)}
                // title={gene.aliases.length != 0 ? `Aliases: ${gene.aliases}` : gene.id}
                sx={{ borderRadius: 0, padding: 0 }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                  }}
                >
                  <GeneIcon height={15} stroke={theme.palette.primary.main} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '10px',
                      textOverflow: 'ellipsis',
                      textWrap: 'nowrap',
                    },
                  }}
                >
                  <span className='GeneID'>{gene.id}</span>
                  <span style={{ color: theme.palette.secondary.main }}>
                    {gene.aliases.length > 0 ? `/${gene.aliases[0]}` : ''}
                  </span>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* GENE INFO POPUP */}
      {/* {selectedGeneHistory.map((gene, i) => {
        return (
          <GeneInfoPopup
            key={i}
            gene={gene}
            anchorOrigin={anchorOrigin}
          />
        )
      })} */}
      {selectedGene != null && (
        <>
          <GeneInfoPopup
            gene={selectedGene}
            open={open}
            anchorOrigin={anchorOrigin}
          ></GeneInfoPopup>
        </>
      )}
    </>
  )
}

export default GeneList
