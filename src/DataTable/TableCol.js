import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Cell } from './Cell';
import { DataTableContext } from './DataTableContext';

const TableColStyle = styled(Cell)`
  font-size: ${props => props.theme.header.fontSize};
  user-select: none;
  font-weight: 500;
  white-space: nowrap;
  color: ${props => props.theme.header.fontColor};
  min-height: ${props => props.theme.header.height};
  ${props => props.sortable && 'cursor: pointer'};

  &::before {
    margin-bottom: 1px;
    font-size: 12px;
    padding-right: 4px;
  }

  ${props => props.sortable && props.sortDirection === 'desc' && !props.sortIcon &&
    css`
      &::before {
        content: '\\25BC';
      }
  `};
  ${props => props.sortable && props.sortDirection === 'asc' && !props.sortIcon &&
    css`
      &::before {
        content: '\\25B2';
      }
  `};
`;

const ColumnCellWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  ${props => props.active && 'font-weight: 800'};
`;

const SortIcon = styled.span`
  line-height: 1;

  i,
  svg {
    font-size: 18px !important;
    height: 18px !important;
    width: 18px !important;
    flex-grow: 0;
    flex-shrink: 0;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition-duration: 0.1s;
    transition-property: transform;
  }

  &.asc i,
  &.asc svg {
    transform: rotate(180deg);
  }
`;

class TableCol extends PureComponent {
  static propTypes = {
    onColumnClick: PropTypes.func.isRequired,
    column: PropTypes.object.isRequired,
  };

  // TODO: migrate to ueContext hook
  static contextType = DataTableContext;

  onColumnClick = e => {
    const {
      column,
      onColumnClick,
    } = this.props;
    const { sortDirection } = this.context;

    onColumnClick(column, sortDirection, e);
  }

  render() {
    const { column } = this.props;
    const { sortIcon, sortColumn, sortDirection, internalCell } = this.context;
    const sortable = column.sortable && sortColumn === column.selector;

    return (
      <TableColStyle
        id={`column-${column.selector}`}
        onClick={this.onColumnClick}
        sortable={sortable}
        sortDirection={sortDirection}
        sortIcon={sortIcon}
        column={column}
        internalCell={internalCell}
        className="rdt_TableCol"
      >
        {column.name && (
          <ColumnCellWrapper active={sortable}>
            {sortable && sortIcon && (
              <SortIcon className={sortDirection}>
                {sortIcon}
              </SortIcon>
            )}
            {column.name}
          </ColumnCellWrapper>
        )}
      </TableColStyle>
    );
  }
}

export default TableCol;
