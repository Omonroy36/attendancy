import React from "react";
import { Context } from "../store/appContext";
import Popover from "../component/popover";

export const Home = () => {
	return (
		<Context.Consumer>
			{({ store, actions }) => {
				let daysInCohort = 120;
				return (
					<div className="mt-2 p-3 line-height-1">
						<select className="mb-4" onChange={e => actions.getStudentsAndActivities(e.target.value)}>
							{store.cohorts.map((e, i) => (
								<option key={i} value={e.slug}>
									{e.name}
								</option>
							))}
						</select>
						{store.students.length === 0 ? (
							<h2 className="text-center my-5">STUDENT INFORMATION NOT AVAILABLE</h2>
						) : (
							<div>
								<table className="d-inline-block cell-spacing">
									<tbody>
										<tr>
											<td
												className="border rounded d-flex justify-content-between 
													mr-4 h-50px align-items-center">
												<b className="p-2 w-200px">Everyone</b>
												<b className="p-2">
													{Math.round(
														store.students.reduce(
															(total, x) => total + x.attendance.avg,
															0
														) / store.students.length
													)}
													%
												</b>
											</td>
										</tr>
										{store.students.map((e, i) => (
											<tr key={i}>
												<td
													className="border rounded d-flex justify-content-between mr-4 h-50px
														align-items-center">
													<span className="p-2 w-200px">
														{e.first_name} {e.last_name}
													</span>
													<span className="p-2">{Math.round(e.attendance.avg)}%</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<div className="d-inline-block overflow">
									<table className="cell-spacing">
										<tbody>
											<tr className=" hover-gray">
												{new Array(daysInCohort).fill(null).map((e, i) => (
													<td key={i} className="p-1 h-50px">
														{store.dailyAvg[`day${i + 1}`] === undefined ? (
															<i className="fas fa-exclamation-circle text-sand fa-lg cursor-pointer" />
														) : (
															<span>
																{store.dailyAvg[`day${i + 1}`] >= 85 ? (
																	<i className="fas fa-thumbs-up font-size-25px text-darkgreen" />
																) : (
																	<i className="fas fa-thumbs-down font-size-25px text-darkred" />
																)}
															</span>
														)}
													</td>
												))}
											</tr>

											{store.students.map((data, i) => (
												<tr key={i} className="hover-gray">
													{new Array(daysInCohort).fill(null).map((e, i) => (
														<td key={i} className="p-1 h-50px">
															{!data.attendance[`day${i + 1}`] ? (
																<Popover body={<div className="">Day {i}</div>}>
																	<i className="fas fa-exclamation-circle text-sand fa-lg cursor-pointer" />
																</Popover>
															) : data.attendance[`day${i + 1}`].slug.includes(
																"unattendance"
															) ? (
																<i className="fas fa-thumbs-down font-size-25px text-darkred" />
															) : (
																<i className="fas fa-thumbs-up font-size-25px text-darkgreen" />
															)}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				);
			}}
		</Context.Consumer>
	);
};
